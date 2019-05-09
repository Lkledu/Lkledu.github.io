# Lkledu.github.io

09/05/2019 - não vou mais usar HLSL no TCC, troquei para o OPENGL que possui mais conteúdo e bibliotecas para auxiliar na criação de janelas e manipulação de objetos 3d com bibliotecas de converção do plano cartesiano do monitor para o z-buffer

Vou usar o glew para não precisar dar build específico com a placa, o glfw para criar janela e o glm pra auxiliar com operações matemáticas. Estou tendo dificuldades para faze-los funcionar no windows com visual studio. O problema principal é eu não possuir a sdk do windows e o cmaker não consegue converter o projeto para eu criar a lib das bibliotecas

links uteis:
https://github.com/nigels-com/glew
https://www.glfw.org/documentation.html
http://www.mcihanozer.com/tips/setting-up-libraries/setting-up-glew-for-visual-studio/


instalei o windows SDK, baixei através de https://developer.microsoft.com/pt-br/windows/downloads/sdk-archive
