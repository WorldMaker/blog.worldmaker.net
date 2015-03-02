---
date: 2012-03-19 23:38:55.037343
db_id: 821
db_updated: 2012-03-19 23:41:19.025431
layout: post
tags: c# silverlight xaml
title: Dynamically Data-binding Columns in XAML
---
There are times when you find that you need to dynamically set the columns in a Silverlight ``DataGrid``: perhaps you've got a need to let users configure the columns or your columns are based on some part of your data model. I've seen several anti-patterns that are in various states of broken and/or over-complicated, such as the one I removed from a code base that managed to build a column for every cell in the ``DataGrid``. [1]_ While Silverlight and WPF now both support stronger (but different implementations) ways to auto-generate columns for more complicated dynamic data structures, there are still times where it is preferable to use a combination of hand-edited columns and columns built against things very specific to your data model. To save me from having to rewrite the class myself ever again (having done so twice), and to possibly help save other people from the broken versions I've seen posted to various webpages, here's my solution to dynamically bind columns from XAML:

.. sourcecode:: c#

    public class ColumnBindingDataGrid : DataGrid
    {
        public ObservableCollection<DataGridColumn> StaticColumns
        {
            get { return (ObservableCollection<DataGridColumn>)GetValue(StaticColumnsProperty); }
            set { SetValue(StaticColumnsProperty, value); }
        }

        public static readonly DependencyProperty StaticColumnsProperty =
            DependencyProperty.Register("StaticColumns", typeof(ObservableCollection<DataGridColumn>), typeof(ColumnBindingDataGrid), null);

        public ObservableCollection<DataGridColumn> BindingColumns
        {
            get { return (ObservableCollection<DataGridColumn>)GetValue(BindingColumnsProperty); }
            set { SetValue(BindingColumnsProperty, value); }
        }

        public static readonly DependencyProperty BindingColumnsProperty =
            DependencyProperty.Register("BindingColumns", typeof(ObservableCollection<DataGridColumn>), typeof(ColumnBindingDataGrid), new PropertyMetadata(null, ColumnsChanged));

        public ColumnBindingDataGrid()
            : base()
        {
            if (this.Style == null)
            {
                // Manually attempt to inherit any implicit style
                this.Style = Application.Current.Resources[typeof(DataGrid)] as Style;
            }

            this.StaticColumns = new ObservableCollection<DataGridColumn>();
        }

        private static void ColumnsChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            var self = sender as ColumnBindingDataGrid;
            var old = e.OldValue as ObservableCollection<DataGridColumn>;
            var n = e.NewValue as ObservableCollection<DataGridColumn>;

            if (old != null) old.CollectionChanged -= self.ColumnsCollectionChanged;
            if (n != null) n.CollectionChanged += self.ColumnsCollectionChanged;
        }

        private void ColumnsCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            switch (e.Action)
            {
                case NotifyCollectionChangedAction.Reset:
                    this.Columns.Clear();

                    foreach (var column in this.StaticColumns)
                    {
                        this.Columns.Add(column);
                    }
                    break;
                case NotifyCollectionChangedAction.Add:
                    foreach (DataGridColumn col in e.NewItems)
                    {
                        if (!this.Columns.Any(c => col.Header.ToString().Equals(c.Header as string, StringComparison.OrdinalIgnoreCase)))
                        {
                            this.Columns.Add(col);
                        }
                    }
                    break;
                case NotifyCollectionChangedAction.Remove:
                    foreach (DataGridColumn col in e.OldItems)
                    {
                        var oldcol = this.Columns.FirstOrDefault(c => col.Equals(c));

                        if (oldcol != null)
                        {
                            this.Columns.Remove(oldcol);
                        }
                    }
                    break;
            }
        }

``BindingColumns`` can be bound to a "ViewModel" [2]_ and will refresh the columns on the ``DataGrid`` accordingly. ``StaticColumns`` is prepended when the ``BindingColumns`` changes and is useful for placing in some columns in the XAML that won't be as data-driven such as selection columns or status columns. I leave it as an exercise to the reader how to build the actual "ViewModel" code, but it should be fairly straightforward to build up the necessary structure of columns and their bindings (don't forget that all recent versions of Silverlight and WPF support dictionary/hash keys surrounded by square brackets in a binding path).

----

.. [1] Every cell was created in its own ``DataGridTemplateColumn`` with its own slightly different ``StringBuilder``-built ``DataTemplate``. The amazing thing was that it worked as well as it did. Up until the point where performance degraded slightly and painting/refresh began to leave noticeable artifacts, it would look like the grid was populated more normally than it was (the columns all appeared under only a single copy of the header, templates were bound as expected). Realizing that it was build using so many columns behind the scenes was a mind-bending series of debugging sessions.

.. [2] I dislike the term "ViewModel", personally. It's not a word and its not a good combination of words (given the easy confusion with both "View" and "Model" in the poorly-named "MVVM pattern"). In my own projects I tend to prefer the term *projection* for what so many call a "ViewModel". That's an actual genuine English word, and it is suitable for the task. (It is used in functional programming and Linq and physics for similar purposes. The "ViewModel" in most applications of the MVVM pattern *projects* the Model onto the View.)