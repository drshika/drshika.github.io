---
layout: post
title: Writing Indian Music Notation in LaTeX
KaTeX: True
---


### Prerequisites

This guide assumes that you already know how to write LaTeX pretty fluently and that you have somewhere that you can either write KaTeX or LaTeX and compile it. I'm going to include alternatives for syntax that is not supported with both, so you can follow along.

### Teentaal Tatkar in LaTeX

$$
\underset{X}{} \undergroup{ta} \space \undergroup{thei} \space \undergroup{thei}\space \undergroup{tat} \space \vert \space  \underset{2}{} \undergroup{aa} \space \undergroup{thei} \space \undergroup{thei}\space \undergroup{tat} \space  \vert \underset{0}{} \undergroup{ta} \space \undergroup{thei} \space \undergroup{thei}\space \undergroup{tat} \space \vert \space \underset{3}{} \undergroup{aa} \space \undergroup{thei} \space \undergroup{thei}\space \undergroup{tat} \vert
$$

As you can see here, LaTeX comes quite in handy for quickly formatting and writing music notation in Bhaktande Paddhati. 

Here's what this looks like in plain ASCII text:

```latex
\underset{X}{} \undergroup{ta} \space \undergroup{thei} \space \undergroup{thei}\space 
\undergroup{tat} \space \vert \space  \underset{2}{} \undergroup{aa} \space \undergroup{thei} 
\space \undergroup{thei}\space \undergroup{tat} \space  \vert \space \underset{0}{} 
\undergroup{ta} \space \undergroup{thei} \space \undergroup{thei}\space \undergroup{tat} 
\space \vert \space \underset{3}{} \undergroup{aa} \space \undergroup{thei} \space 
\undergroup{thei}\space \undergroup{tat} \vert
```

Thankfully, none of the characters required in Vishnu-Digambar Padhati require external LaTeX packages and can be rendered with KaTeX-MathJax, which makes this perfect for blogs and websites!

### Bhaktande Padhati

Let's break this down into the individual elements.

1. **Beat**: We can use `\undergroup{args}` in LaTeX and `\underparen` in KaTeX to draw an arc underneath something that is one beat. Use `\text{}` to format your text regularly.

```latex
\undergroup{\text{this is one beat}}
```

$$
\undergroup{\text{this is one beat}}
$$

2. **Breaks**: Use a regular `-` from keyboard input or `S` to indicate silence. 
3. **Divisions/Vibhags**: Use `\vert` to create a vertical line, use `\Vert` to indicate the end of a composition
4. **Group labels**: If you want to label the start of a group in a taal, you can use `\underset` on an empty group. We can also use `\underset` on the `\undergroup` group to label the beat. 

```latex
\vert \underset{X}{} \underset{1}{\undergroup{\text{sa re ga}}} ~ \vert\vert
```

$$
\vert \underset{X}{} \underset{1}{\undergroup{\text{sa re ga}}} ~ \Vert
$$

For labeling the beat, make sure the second argument of your `\underset{}` is the `\undergroup{}` group.

*Some other formatting notes*: It might be helpful to the reader to introduce line breaks in your composition. You can use the newline flag `\newline` or you can use two backslashes `\\` to create a new line in LaTeX.

```latex
\\ \text{this is a line. } 
\text{indenting won't put you on a new line.}
\\ \text{this is another line} 
\newline\text{or this is another line}
```
$$
\\ \text{this is a line. }
\text{indenting won't put you on a new line.}
\\ \text{this is another line} 
\\ \text{or this is another line}
$$

Also in LaTeX math mode, characters are spaced as if they were part of a single word, regardless of the actual amount of times you space in between. You can use `~` or `\space` to create a space between two expressions.

The above is enough to start writing notation for dance compositions, however, for music compositions we require more notation. Thankfully this can also be done with KaTeX/LaTeX.

1. Komal/Flat Notes: use `\underline{}` to designate notes that are flat. Here is Thaat Bhairav Aroh to demonstrate the formatting.
   ```latex
   \text{Bhairav Aroh: }sa ~ \underline{re} ~ ga ~ ma ~ pa ~ \underline{dha} ~ ni ~ sa
   ```
   $$\text{Bhairav Aroh: }sa ~ \underline{re} ~ ga ~ ma ~ pa ~ \underline{dha} ~ ni ~ sa$$

2. Tivra/Sharp Notes: You can use `\stackrel{}{}` or just a regular tic mark, whatever you prefer aesthetically.

   ```latex
   \stackrel{\text{'}}{re} \text{or } re'
   ```

$$\stackrel{\text{'}}{re} \text{or } re'$$

3. Octaves: Use `\stackrel{}{}` to put a dot either above or below the note. Or you can use exponents and subscripts with a carat `^` or underscore `_`. This part is also dependent on what you prefer.
   ``
   \text{[Stackrel] } \text{Low Sa: }\stackrel{\text{sa}}{.} ~ \text{High Sa:} \stackrel{.}{\text{sa}}\\ \text{[Sub and Superscripts] } \text{Low Sa: }  ~ \text{sa}_. ~ \text{High sa:} ~ \text{sa}^.
   ``

   ```latex
   \text{[Stackrel] } \text{Low Sa: }\stackrel{\text{sa}}{.} ~ \text{High Sa:} \stackrel{.}{\text{sa}}
   \\ \text{[Sub and Superscripts] } \text{Low Sa: }  ~ \text{sa}_. ~ \text{High sa:} ~ \text{sa}^.
   ```

### Vishnu Digambar Padhati

In Vishnu Digambar, each beat also has additional clarity of whether syllables are 1/2 beat, 1/4 beat and so on so forth. Nesting `\undergroup{}` should help you express this.
```latex
\text{[dogun] }\undergroup{\undergroup{\text{sa re}}}
\text{ [tigun] }\undergroup{\undergroup{\undergroup{\text{sa re ga}}}}
\text{ [chaugun] }\undergroup{\undergroup{\undergroup{\undergroup{\text{sa re ga ma}}}}}
```

$$
\text{ [dogun] }\undergroup{\undergroup{\text{sa re}}}
\text{ [tigun] }\undergroup{\undergroup{\undergroup{\text{sa re ga}}}}
\text{ [chaugun] }\undergroup{\undergroup{\undergroup{\undergroup{\text{sa re ga ma}}}}}
$$

### Feedback

Did you find this guide helpful? Or do you have any corrections or suggestions? Feel free to reach out @ drshika2 (at) illinois (dot) edu.