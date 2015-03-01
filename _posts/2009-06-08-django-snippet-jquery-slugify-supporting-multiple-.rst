---
date: 2009-06-08 05:14:33.716378
db_id: 534
db_updated: 2009-06-08 05:14:33.716423
layout: post
tags: django jquery coding
title: 'Django Snippet: jQuery Slugify Supporting Multiple Select'
---
I wanted a slugify [1]_ tool for a form that I was working on and was using jQuery elsewhere, so I quickly found `a jQuery slugify`__ on Django Snippets. The problem that I ran into was that I wanted to support slugifying multiple inputs (concatenated with spaces), which is something that Django's Admin's provided pre-populated fields-based slugify JavaScript handles. I was also surprised to find that the snippet I found didn't lowercase the input. Below is my simple modifications to handle multiple inputs in a jQuery selection:

__ http://www.djangosnippets.org/snippets/1488/

.. sourcecode:: js

   // Based Upon DjangoSnippets: http://www.djangosnippets.org/snippets/1488/ 
   jQuery.fn.slugify = function(obj) {
       jQuery(this).data('origquery', this);
       jQuery(this).data('obj', jQuery(obj));
       jQuery(this).keyup(function() {
           var obj = jQuery(this).data('obj');
           var oquery = jQuery(this).data('origquery');
           var vals = [];
           jQuery(oquery).each(function (i) {
               vals[i] = (jQuery(this).val());
           });
           var slug = vals.join(' ').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'');
           obj.val(slug);
       });
   }

Usage is just like the other snippet, but supports selections like:

.. sourcecode:: js

   $(function() {
       $("#id_brand, #id_name").slugify("#id_slug");
       $(".prepopulate_slug").slugify("#id_slug2");
   });

.. [1] For the uninitiated, Django brought the term "slug" to web design from the newspaper world. In a newspaper a slug is one of those short one or two word summaries used to help someone find the continuation of a story. In web design this refers to a URL segment that often replaces a ID number with something more memorable and/or descriptive. (For instance, the slug for this very blog entry, as you can see in your address bar, is ``django-snippet-jquery-slugify-supporting-multiple-``) Because slugs are best when related to some other text in an object, such as my blog slugs come from my blog titles, there are several useful ways in Django to auto-convert (or slugify) some input.