---
date: 2008-10-25 04:18:59.862268
db_id: 504
db_updated: 2008-10-25 15:28:19.181822
layout: post
tags: coding xna
title: BooInterpreter Class for XnaConsole
---
I've been using XnaConsole_ in a couple of projects.  It's quite handy to have around, and easy to plug in to a project.  The author asks for people to share when they use it with an interpreter of a new language (he provides an IronPython_ example).  For a recent project I wanted to use Boo_ instead, so here's my Boo interpreter:

.. _XnaConsole: http://codeplex.com/XnaConsole
.. _IronPython: http://codeplex.com/IronPython
.. _Boo: http://boo.codehaus.org/

.. sourcecode:: csharp

  //
  // Boo Interpreter for XNA Console
  //
  // Copyright (C) 2008 Max Battcher.  All Rights Reserved.
  // Licensed under the Microsoft Permissive License (Ms-PL).
  using System;
  using System.Collections.Generic;
  using System.IO;
  using System.Text;
  using Boo.Lang.Compiler;
  using Boo.Lang.Interpreter;
  using Microsoft.Xna.Framework;
  using Microsoft.Xna.Framework.Graphics;


  namespace XnaConsole
  {
      /// <remarks>
      /// This class implements an interpreter using Boo
      /// </remarks>
      public class BooInterpreter
      {
          const string Prompt = ">>> ";
          const string PromptCont = "... ";
          const string Returned = "<<< {0}";
          string multi;
          public XnaConsoleComponent Console;
  
          InteractiveInterpreter interpreter;
  
          public InteractiveInterpreter Interpreter
          {
              get { return interpreter; }
          }
  
          /// <summary>
          /// Creates a new BooInterpreter
          /// </summary>
          public BooInterpreter(Microsoft.Xna.Framework.Game game, SpriteFont font)
          {
              interpreter = new InteractiveInterpreter();
              interpreter.Ducky = true; // Keep from having to make static type decisions in console
              interpreter.RememberLastValue = true;
              foreach (System.Reflection.Assembly assembly in System.AppDomain.CurrentDomain.GetAssemblies())
              {
                  interpreter.References.Add(assembly);
              }
              interpreter.Eval("import Microsoft.Xna.Framework\nimport Microsoft.Xna.Framework.Graphics\nimport Microsoft.Xna.Framework.Content");

              multi = "";

              Console = new XnaConsoleComponent(game, font);
              game.Components.Add(Console);
              Console.Prompt(Prompt, Execute);
              AddGlobal("Console", Console);
          }

          /// <summary>
          /// Executes boo commands from the console.
          /// </summary>
          /// <param name="input"></param>
          /// <returns>Returns the execution results or error messages.</returns>
          public void Execute(string input)
          {
              object last;
  
              try
              {
                  if ((input != "") && ((input[input.Length - 1].ToString() == ":") || (multi != ""))) //multiline block incomplete, ask for more
                  {
                      multi += input + "\n";
                      Console.Prompt(PromptCont, Execute);
                  }
                  else if (multi != "" && input == "") // end of multiline
                  {
                      input = multi; // make sure that multi is cleared, even if it returns an error
                      multi = "";
                  }
  
                  if (multi == "" && input != "") // execute
                  {
                      CompilerContext cc = interpreter.Eval(input);
                      foreach (CompilerError ce in cc.Errors)
                      {
                          Console.WriteLine("ERROR: " + ce.ToString());
                      }
                      last = interpreter.LastValue;
                      if (last != null) Console.WriteLine(string.Format(Returned, last));
                      Console.Prompt(Prompt, Execute);
                  }
              }
              catch (Exception e)
              {
                  Console.WriteLine("ERROR: " + e.ToString());
              }
          }
  
          /// <summary>
          /// Adds a global variable to the environment of the interpreter.
          /// </summary>
          /// <param name="name"></param>
          /// <param name="value"></param>
          public void AddGlobal(string name, object value)
          {
              interpreter.SetValue(name, value);
          }
      }
  }