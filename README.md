# Lkledu.github.io

09/05/2019 3:00- não vou mais usar HLSL no TCC, troquei para o OPENGL que possui mais conteúdo e bibliotecas para auxiliar na criação de janelas e manipulação de objetos 3d com bibliotecas de converção do plano cartesiano do monitor para o z-buffer

Vou usar o glew para não precisar dar build específico com a placa, o glfw para criar janela e o glm pra auxiliar com operações matemáticas. Estou tendo dificuldades para faze-los funcionar no windows com visual studio. O problema principal é eu não possuir a sdk do windows e o cmaker não consegue converter o projeto para eu criar a lib das bibliotecas

links uteis:
https://github.com/nigels-com/glew
https://www.glfw.org/documentation.html
http://www.mcihanozer.com/tips/setting-up-libraries/setting-up-glew-for-visual-studio/


instalei o windows SDK, baixei através de https://developer.microsoft.com/pt-br/windows/downloads/sdk-archive

09/05/2019 17:12 - único link que adiantou https://www.youtube.com/watch?v=vGptI11wRxE , e no fim das contas eu estava instalando a lib errada do glfw, eu estou com visual studio 2017 e estava instalando a vs2015

10/05/2019 01:46 - No fim das contas não deu certo configurar as libs do visual studio na mão e usei o NuGet para instalar

17/05/2019 03:25 - Iniciado os testes para a criação de um triangulo usando OpenGL
