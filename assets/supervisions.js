// Supervisions (source: Lattes CV). Titles are kept in their original language.
// type: phd, msc, tcc (BSc thesis), ic (undergrad research), ext (outreach), esp (specialization).
// role: "co" for co-supervision (tagged on the page; main advisor is the default, untagged).
// status: "ongoing" while in progress (default: completed).
// course: key into COURSES in main.js.
window.SUPERVISIONS = [
  // Undergraduate research (IC) — UTFPR, Computer Engineering
  { type: "ic", y: 2026, name: "Matheus Bonfim da Rocha", title: "Algoritmos de Aprendizado de Máquina aplicados na Bioinformática" },
  { type: "ic", y: 2026, name: "Guilherme Pança Franco", title: "Classificação de Imagens usando Algoritmos de Aprendizado Profundo", fund: "Fundação Araucária" },
  { type: "ic", y: 2026, name: "Estefane de Lima Santos", title: "Benchmarking e Análise de Algoritmos de AutoML", fund: "CNPq" },
  { type: "ic", y: 2026, name: "Miguel Marchiori da Silva Correa", title: "Estudo de Algoritmos para Tomada de Decisão e Planejamento de Rotas em Robôs Autônomos", fund: "CNPq" },
  { type: "ic", y: 2025, name: "Matheus Bonfim da Rocha", title: "Identificação de Doenças via Imagens de Termografia" },
  { type: "ic", y: 2025, name: "Jomo Vitor Garcia Carvalho", title: "Reconhecimento Automático de Objetos em Imagens Digitais" },
  { type: "ic", y: 2025, name: "Thales Alves da Silva", title: "Reconhecimento Automático de Padrões em Imagens", fund: "CNPq" },
  { type: "ic", y: 2025, name: "Livia Oliveira Matias Diniz", title: "Reconhecimento de Padrões usando Aprendizado de Máquina", fund: "CNPq" },
  { type: "ic", y: 2024, name: "André Luis de Oliveira", title: "Classificação de Músicas em Gêneros via Aprendizado de Máquina" },
  { type: "ic", y: 2024, name: "Thiago Berto Minson", title: "Análise de Sentimentos em Dados Textuais" },
  { type: "ic", y: 2024, name: "Bruno Uhlmann Marcato", title: "Contagem automatizada de feridas em ratos" },
  { type: "ic", y: 2023, name: "Bruno Uhlmann Marcato", title: "Identificação e Segmentação de Feridas em Ratos via Processamento de Imagens" },
  { type: "ic", y: 2022, name: "Bruno Uhlmann Marcato", title: "Classificação de Imagens e Reconhecimento de Padrões" },
  { type: "ic", y: 2021, name: "Lucas Hideki Sybuia", title: "Compreendendo o Uso de Séries Temporais" },
  { type: "ic", y: 2021, name: "Thiago Berto Minson", title: "Recomendação de algoritmos para aprendizado supervisionado usando meta-aprendizado" },
  { type: "ic", y: 2021, name: "Leonardo Rafael Bueno", title: "Automatização de tarefas de aprendizado não-supervisionado", fund: "Fundação Araucária" },
  { type: "ic", y: 2020, name: "Walison Pitombeira da Silva", title: "Recomendação de Técnicas e Algoritmos para Classificação de Imagens", fund: "Fundação Araucária" },

  // BSc theses (TCC)
  { type: "tcc", y: 2026, name: "Lucas Eduardo Pires Parra", title: "Monitoramento Remoto de Áreas de Vegetação de Araucária usando Aprendizado de Máquina", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2026, name: "Thiago Berto Minson", title: "Análise de Sentimento em Textos Literários Poéticos Usando Técnicas de Processamento de Linguagem Natural", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2026, name: "Guilherme Moreira Lima Furlaneto", title: "Detecção de Incêndios na América do Sul: Aplicação de Deep Learning em Imagens do Satélite Landsat-8", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2026, name: "Gabriel Candelária Wiltgen Barbosa", title: "Automatizando o Design de Jogos por meio de Geração Procedural e Aprendizado de Máquina", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2025, name: "Gabriel Molina de Lima", title: "Avaliação dos Efeitos da Seleção de Características e da Otimização de Hiperparâmetros no Reconhecimento de Gestos baseados em sEMG", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2025, name: "Bruno Uhlmann Marcato", title: "Estimativa Automática de Área de Feridas em Imagens de Ratos: Análise e Projeto de um Sistema de Decisão", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2025, name: "André Luis de Oliveira", title: "Classificação multirrótulo de instrumentos musicais em áudios polifônicos", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2025, name: "Ian Ribeiro Ferranti", title: "Previsão Direcional do Mercado de Ações com Dados Textuais e Financeiros: Um estudo com LSTM e BERT", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2024, name: "Pedro Mian Parra", title: "Predição de Evasão Estudantil usando Aprendizado de Máquina", course: "cc", inst: "UTFPR" },
  { type: "tcc", y: 2023, name: "Matheus Felipe Mileski Lopes", title: "Análise de Sentimentos em redes sociais durante a temporada 2022 da Fórmula 1: um estudo utilizando processamento de linguagem natural no twitter", course: "ec", inst: "UTFPR" },
  { type: "tcc", y: 2019, name: "Vinicius Casani", title: "Uso de Aprendizado de Máquina para Identificação de Perfis Depressivos em Redes Sociais", course: "es", inst: "UTFPR" },
  { type: "tcc", y: 2012, name: "Edison Antonio Sahd Filho", title: "Reconhecimento Facial Usando Redes Neurais Artificiais", course: "cc", inst: "UniFil" },
  { type: "tcc", y: 2012, name: "Tabata Yasmin Ue", title: "Reconhecimento de Kanjis em Contextos Educacionais", course: "si", inst: "UniFil" },
  { type: "tcc", y: 2012, name: "Yorrana Carolina de Souza Teixeira", title: "Computação Ubíqua: princípios e aplicações", course: "cc", inst: "UniFil" },
  { type: "tcc", y: 2011, name: "André Guilherme Manoel", title: "Análise de algoritmos utilizados para resolução do jogo de damas", course: "cc", inst: "UniFil" },

  // Specialization in Data Science — UTFPR
  { type: "esp", y: 2024, name: "Weber Cláudio da Silva", title: "Classificação de sinais de EEGs para detecção de demência e Alzheimer" },
  { type: "esp", y: 2024, name: "Willian Ferreira Rodrigues", title: "Uso de Aprendizado de Máquina na Predição de Churn em Empresa SaaS" },
  { type: "esp", y: 2024, name: "Marcelo Bezerra de Noronha", title: "Predição de Ativos na Bolsa de Valores usando Redes Neurais Recorrentes" },
  { type: "esp", y: 2022, name: "Estevan Aquiles Pazzetti", title: "Uso de algoritmos de aprendizado de máquina e métodos de análise para predição de performance em banco de dados" },
  { type: "esp", y: 2022, name: "Nelson Jacob Derssler", title: "Classificação de textos escolares baseada em processamento de linguagem natural" },
  { type: "esp", y: 2022, name: "Henrique Marques Turqueti", title: "Modelos de Aprendizado de Máquina para Previsão do Preço do Óleo Diesel na Região Sudeste do Brasil" },
  { type: "esp", y: 2022, name: "Lucas Dybax de Andrade", title: "Classificação da Faixa de Peso de Produtos com Deep Learning e BERT" },
  { type: "esp", y: 2021, name: "Edgar de Souza Vismara", title: "Classificação do nível de crescimento de colônias de fungos em meio sólido: uma abordagem baseada em aprendizado de máquina" },

  // Graduate (co-supervision)
  { type: "phd", role: "co", y: 2025, name: "Aline Marques Del Valle", title: "Aprendizado de Máquina Automatizado Multiobjetivo para Classificação Multirrótulo", course: "cc", inst: "UFSCar" },
  { type: "msc", role: "co", y: 2020, name: "Thiago de Jesus Inocêncio", title: "A Methodology for Designing System-of-System Architecture based on Emergent Behaviour obtained from Business Process", course: "cc", inst: "UFABC" }
];
