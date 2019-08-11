---
layout: post
title: IA Terminologias
author: Eduardo
tag: [AI, Math, Statistic, C#, pt]
date: 2019-08-11 13:29:00
---

Quando trabalhamos com inteligência artificial temos dois elementos básicos que compõem nosso sistema, os agentes e os ambientes.

Agentes:
Algoritmo responsável por analisar, quantificar e qualificar informações recebidas, através de heuristicas pré estabelecidas, paramêtros pré definidos ou paramêtros obtidos através do treino da inteligência artificial.

Ambiente:
Ambiente que irá prover dados para o agente, que por sua vez, irá devolver uma resposta baseada nos parâmetros presentes no ambiente, no momento que este foi observado.

Um ambiente pode ser completamente observavel ou parcialmente observavel (Fully Observable, Partially Observable). Um ambiente completamente observavel é aquele em que a todo momento os sensores de um agente podem perceber o estado inteiro do ambiente, como em um sistema que faz o diagnóstico de doenças, em que o sistema poderá sempre aferir o estado do paciênte. Por outro lado, um ambiente parcialmente observavel, é aquele em que o agente somente consegue perceber parte do estado do ambiente, como em uma IA de jogo de poker, em que o ambiente seria o oponente, e nem sempre o agente poderá saber quais cartas o outro jogador possui. Uma das técnicas aplicadas em agentes que trabalham em ambientes parcialmente observaveis é a de memorizar medições passadas, para que o agente possa possuir informações que não são facilmente observáveis, no momento que irá tomar uma nova decisão (perception-action cycle)

Um ambiente também pode ser determinista ou estocástico.

Determinista: O resultado é determinado por uma série de movimentos e/ou algoritmos que podem ser previstos e mapeados. Como no caso de um jogo de xadrez, em que cada movimento feito reduz a quantidade de movimentos possiveis (disponiveis), fazendo com que possam ser mapeados em uma árvore de decisões.

Estocástico: O resultado depende de um fator aleatório que não tem como ser mapeado. Como um algoritmo que tenta descobrir o valor que irá sair ao se jogar um dado.

Um ambiente pode ser descrito como discreto ou contínuo.

Discreto: Há uma quantidade finita de ações, e um número finíto de coisas que podem ser percebidas. Por exemplo, em um jogo de xadrez, há um número finito de posições no tabuleiro e de jogadas possiveis

Contínuo: Há uma quantidade infinita de casos e ações que possam ocorrer. Como em um jogo de dardos, onde o jogador pode jogar o dardo de maneiras infinitas.

Há também os ambientes benignos e adversários.

Benignos: Neste caso não há nada no ambiente que contrarie nosso objetivo. Por exemplo, a previsão do tempo, onde p ambiente pode ser estocástico e contínuo, mas não envia sinais afim de contrariar o objetivo do algoritmo que é executado no sistema.

Adversários: Os ambientes adversários, como é o caso de muitos jogos, possuem elementos que tentam contrariar os objetivos esperados. Estes ambientes apresentam uma resposta de reação a cada ação executada pelo sistema.

fonte: (https://www.udacity.com/) - Acessado em 11/08/2019 - 13:29:00