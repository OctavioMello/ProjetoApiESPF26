//Declarações dos elementos com DOM
const videoElemento = document.getElementById('video');
const botaoScanear = document.getElementById('btn-texto');
const resultado = document.getElementById('saida');
const canvas = document.getElementById('canvas');

//Função para habilitar a câmera

async function configurarCamera(){
    try{
        const midia = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "Environment"}, //Habilitando câmera traseira do celular
            audio: false //O áudio não será capturado
        })
        //Atribuir o fluxo da câmera em mídia
        video.Elemento.srcObject=midia;
        //Garante que a câmera vai funcionar
        videoElemento.play();
    }catch(erro){
        resultado.innerText="Erro ao capturar a câmera",erro
    }
}
//Executa a função da câmera
configurarCamera();

//Função para capturar o texto

botaoScanear.onclick = async ()=>{
    botaoScanear.disabled = true; //Habilita o botão para pegar o texto
    resultado.innerText = "Fazendo a leitura...aguarde";

    //Prepara o canvas para receber a estrutura em 2d
    const contexto = canvas.getContext("2d");

    //Ajusta o tamanho do canvas de acordo com o vídeo
    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    //Define a matriz de transformação do canvas (escala, inclinação)
    contexto.setTransform(1, 0, 0, 1, 0, 0);

    //Aplica filtro de contraste para melhorar o OCR
    contexto.filter = "contraste(1.2) grayscale(1)";

    contexto.drawImage(videoElemento, 0, 0, canvas.width, canvas.height);

    try{
        //O Tesseract retorna o objeto
        const{data: {text}} = await Tesseract.recognize(
            canvas,
            'por'
        );
        //Remove todos os espaços em branco
        const textoFinal= text.trim();
        resultado.innerText=textoFinal.length > 0 ? textoFinal : "Não foi possível identificar o texto"
    }catch(erro){
        resultado.innerText="Erro ao processar a leitura",erro
    }finally{
        //Desabilita a leitura do texto para começar novamente
        botaoScanear.disabled=false;
    }
}