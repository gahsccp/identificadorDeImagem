//Aqui, estamos declarando quatro variáveis globais:

//canvas: Será usada para desenhar a área onde a webcam será exibida.
let canvas;
 //video: Vai capturar o feed da webcam.
let video;
//classifier: Será usada para armazenar o classificador de imagem, neste caso, o modelo MobileNet.
let classifier;
//previousResult: Guarda o último resultado identificado pelo modelo para evitar repetição de mensagens.
let previousResult = '';


//setup(): Esta função é chamada automaticamente uma vez quando o programa inicia.
  
    
function setup() {
  //createCanvas(300, 300): Cria um canvas de 300x300 pixels para desenhar.
  canvas = createCanvas(300, 300);
  //canvas.center(): Centraliza o canvas na página.
  canvas.center();
  //createCapture(VIDEO): Acessa a webcam do dispositivo e captura o vídeo.
  video = createCapture(VIDEO);
  //video.hide(): Esconde o elemento de vídeo HTML, pois só queremos desenhá-lo no canvas.
  video.hide();
  //ml5.imageClassifier('MobileNet', modelLoaded): Carrega o modelo de classificação de imagens MobileNet e chama a função 
  //modelLoaded quando o modelo é carregado.
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

//modelLoaded(): Função de callback chamada quando o modelo MobileNet é carregado com sucesso.   
function modelLoaded() {
  //console.log('Model Loaded!'): Exibe a mensagem "Model Loaded!" no console do navegador para indicar que o modelo foi carregado com sucesso.
  console.log('Model Loaded!');
}

//draw(): Esta função é chamada repetidamente para desenhar no canvas.

    
    
function draw() {
  //image(video, 0, 0, 300, 300): Desenha o feed de vídeo da webcam no canvas, começando no canto superior esquerdo (0, 0) e com tamanho 300x300 pixels.
  image(video, 0, 0, 300, 300);
  //classifier.classify(video, gotResult): Chama a função classify do classificador MobileNet para identificar o que está sendo exibido no 
  //feed de vídeo. A função gotResult é chamada com os resultados.
  classifier.classify(video, gotResult);
}

// gotResult(error, results): Função de callback chamada com os resultados da classificação.
function gotResult(error, results) {
  //if (error): Verifica se ocorreu um erro durante a classificação.
  if (error) {
    //console.error(error): Exibe o erro no console.
    console.error(error);
    //else: Se não houver erro:
  } else {
    // Verifica se a confiança (confidence) do resultado é maior que 0.5 e se o resultado atual é diferente do resultado anterior (previousResult).
    if ((results[0].confidence > 0.5) && (previousResult !== results[0].label)) {
      //console.log(results): Exibe os resultados no console.
      console.log(results);
      // Atualizar a variável previousResult
      previousResult = results[0].label;
      // Usar a API de fala da Web window.speechSynthesis para falar
      let synth = window.speechSynthesis;
      // Armazenar os dados que queremos que o aplicativo Web fale em uma variável
      let speakData = 'O objeto detectado é - ' + results[0].label;
      // Usar a função SpeechSynthesisUtterance() Web Speech API para converter o texto em fala
      let utterThis = new SpeechSynthesisUtterance(speakData);
      // Usar a função speak() da API de Fala Web window.speechSynthesis para falar os dados armazenados na variável utterThis
      synth.speak(utterThis);
      // Atualiza os elementos HTML resultObjectName e resultObjectAccuracy com o rótulo e a confiança do resultado.
      document.getElementById("resultObjectName").innerHTML = results[0].label;
      document.getElementById("resultObjectAccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}
