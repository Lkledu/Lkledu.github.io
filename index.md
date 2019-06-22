---
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

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8"/>
        <title>Lkledu.io</title>
    </head>
    <body>
        <ul>
        {% for item in page.tags_summary%}
        <li>{{item}}</li>
        {% endfor %}
        </ul>
    </body>
</html>