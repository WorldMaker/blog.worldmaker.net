---
date: 2012-04-29 01:28:07.227149
db_id: 887
db_updated: 2012-04-29 01:31:50.126006
layout: post
tags: coding f# wpf
title: Introducing Debtstack
---
Here's an initial copy of Debtstack_ (preliminary location) to try. You'll need WPF up to date to run the binaries under ``bin\Debug`` or Visual Studio 2010 or later with F# support installed. I'd love to hear if anyone finds this tool useful and/or interesting. (The full darcs repository (Ms-RL) is provided if anyone is interested in emailing me patches. Given that it is a darcs repository of an F# application I'm not expecting much interest in collaboration, but would welcome surprises.)

.. _Debtstack: http://dl.dropbox.com/u/3936701/Debtstack.zip

Overview
--------------------------------------------------------------------------

Debtstack is my attempt to provide *interesting* answers to the question of "What am I currently paying off on my credit card?". It started life as a series of spreadsheets and I decided to further automate it and use it as an excuse to do some F# programming.

Concept
--------------------------------------------------------------------------

The typical way to look at a credit card account is to see it where you are paying off purchases in the order that they are made: *first in, first out*. In data structures terms we refer to this as a queue. You can just take your last few statements and start adding up transactions until you meet your current balance and you've got a queue view into what you are currently paying off. To me, however, it is not an "interesting" view. The view tends to obscure the real reasons you may be in debt and tends to give focus more to recent trivial purchases.

The related data structure to the queue is referred to as a stack. In a stack items are dealt with *first in, last out*. It seemed clear to me, given the time value of money, that the stack was a more interesting way to look at an account. After having captured this sort of few for a couple years now in spreadsheet form, I'm pretty confident that it does provide the basis for a much more interesting view of one's debt. It gives more "weight" to big purchases and, in my opinion, a better idea of how "behind" you are in paying things off.

Algorithms
---------------------------------------------------------------

Debtstack encodes both of the rather simple algorithms I used in my spreadsheets:

Simple
    This is a pure, simple stack implementation: truly the first transaction you make in the account is the last you pay off. It will haunt you there until you finally pay off the account in full.
Proportional
    This is a bit more complicated. Transactions are paid off proportionally, where every transaction would get an equal share of the payment. When there are leftovers from a share those go towards the older transactions.

Input File Formats
--------------------------------------------------------------

Debtstack currently supports two simple file formats:

Tab-delimited
    This is a simple format, easy to export from spreadsheet tools or to work with directly in an text editor. A valid row for a transaction is: the date of the transaction, one or more tab characters, a name/description for the transaction, one or more tab characters, and the amount of the transaction. Negative amounts are purchases (debits) and positive amounts are payments (credits). Transactions whose name/description begin with "Interest" are treated specially. Any additional comments after the amount are ignored.
Mint CSV
    I use Mint_ as a day to day tool to visualize and track my finances, and thus it made a lot of sense to load its exported CSV format directly. When you select an account's transactions in Mint, the export link will be at the bottom of the page. The only thing to note here is that you need to be aware of duplicate transactions. It seemed that I had quite a few duplicates primarily from transfers (payments) where it posted to one account on one day and the other a few days later. Just marking the transaction as duplicate doesn't provide any useful information in the export, you first have to set the category to "Exclude from Mint" (Debstack will exclude anything with a category that begins with "Exclude"). (For transactions already marked as duplicate you would need to uncheck the duplicate box, change the category, then recheck the duplicate box.)

.. _Mint: https://www.mint.com

NuGet Packages
----------------------------------------------------------------

As may be expected, I rely on a couple of useful libraries for productivity and I absolutely rely on NuGet_ to keep track of them. Here's what Debtstack currently uses, and why:

.. _NuGet: http://nuget.org

CsvHelper
    Used for reading the Mint CSV format.
WPFToolkit.DataVisualization
    Used for the simple, pretty pie chart control, without which Debtstack wouldn't feel like "a real financial app".
ImpromptuInterface, ImpromptuInterface.MVVM, ImpromptuInterface.FSharp
    ``ImpromtuInterface.MVVM`` is one of, literally, millions of "MVVM" frameworks on NuGet and thus far the only one I actually liked or felt made me more productive without bloating my code base. ``ImpromptuInterface.MVVM`` uses dynamic binding support to create the INotifyPropertyChanged boilerplate based upon an interface contract, which works well in my opinion. ``ImpromptuInterface`` is full of useful glue code for working with generics, and ``ImpromptuInterface.FSharp`` so far as I can tell seems nearly critical for working with dynamic bindings in FSharp.