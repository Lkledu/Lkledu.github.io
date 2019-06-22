---

title: Home
layout: home

tags_summary:
- C#
- C++
- Angular
- Unity
- Math
- Data-Structure
- Algorithm
- Java
- Database
- 3D model
---

Teste..
Blog onde escrevo sobre meus projetos e oque estou estudando

<html lang="en">
    <head>
        <meta charset="utf-8"/>
    </head>
    <body>
        <header></header>
        <ul>
        {% for item in page.tags_summary%}
        <li>{{item}}</li>
        {% endfor %}
        </ul>
        <footer></footer>
    </body>
</html>