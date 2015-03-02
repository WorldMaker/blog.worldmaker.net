---
date: 2007-06-07 16:27:21.928339
db_id: 374
db_updated: 2008-02-21 15:16:45.438119
layout: post
tags: programming
title: Downcasting C# Generics...
---
This is one of the things that becomes stickier and more annoying due to my near constant jumping back and forth between Python (web apps and one-off data wrangling scripts) and C# (the current big project).  But, it's bugged me for a while...  It would be nice to have an easier way to handle the many situations of having on hand a ``List<DerivedClass>`` and needing to make use of that as a ``IList<BaseClass>``.  I realize that it's the sort of magic meta-programming often frowned upon in strongly-typed languages but I would be so happy if Generic Collections could provide even just ``IEnumerable<BaseType>`` for the base-chain and interfaces...