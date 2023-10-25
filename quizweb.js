import confetti from 'https://cdn.skypack.dev/canvas-confetti';
const questions = [
    {
        question: "Đâu là động vật dài nhất được ghi nhận thực tế?",
        answers: [
            { text:'Cá Mập', correct:false},
            { text:'Cá Voi Xanh', correct:true},
            { text:'Hươu cao cổ', correct:false},
            { text:'Mực', correct:false},
        ],
        explain : " Chiều dài của Cá Voi Xanh dao động từ 20-24m. Cá mập 3.5-5.2m. Hươu cao cổ 4.8-5.5m. Mực 2m"

    },
    {
        question: "Tìm số lớn nhất ?",
        answers: [
            { text:'9999999', correct:true},
            { text:'9969999', correct:false},
            { text:'9999996', correct:false},
            { text:'6699696', correct:false}
        ],
        explain :"Tất cả đáp án đều là 7 chữ số , 9999999 tất cả đều là 9 các đáp án khác đều có lần 1 số 6 "
    },
    {
        question: "Ai là Chủ tịch nước đầu tiên của Cộng hòa Xã hội Chủ nghĩa Việt Nam?",
        answers: [
            { text:'Hồ Chí Minh', correct:false},
            { text:'Tôn Đức Thắng', correct:true},
            { text:'Huỳnh Thúc Kháng', correct:false},
            { text:'Phạm Văn Đồng', correct:false}
        ],
        explain : "Cụ Tôn Đức Thắng được bầu làm chủ tịch nước đầu tiên của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam sau khi nước ta đổi tên từ Việt Nam Dân chủ Cộng hòa sang Cộng hòa Xã hội Chủ nghĩa Việt Nam "
    },
    {
        question: "Đâu là một loài chim?",
        answers: [
            { text:'Cá voi xanh', correct:false},
            { text:'Đại bàng', correct:true},
            { text:'Hươu cao cổ', correct:false},
            { text:'Mực', correct:false}
        ],
        explain : "Trong các loài được liệt kê, chỉ có Đại bàng là một loài chim thực sự. Cá voi xanh và hươu cao cổ là những loài động vật khác, và mực là một loài động vật biển không phải là loài chim."
    },
    {
        question: "Chọn đáp án đúng: 5-6*9+9-20+69+87*0-55 = ?",
        answers: [
            { text:'64', correct:false},
            { text:'-78', correct:false},
            { text:'87', correct:false},
            { text:'-46', correct:true}
        ],
        explain : "Nhân chia trước cộng trừ sau"
    },
    {
        question: "Ngọn núi cao nhất Hệ Mặt Trời ?",
        answers: [
            { text:'Đỉnh Everest', correct:false},
            { text:'Fansipan', correct:false},
            { text:'Đỉnh Olympus', correct:true},
            { text:'K2', correct:false}
        ],
        explain : "Đỉnh Olympus (Sao Hỏa) cao tới ~25km gấp ~3 lần Everest ngọn núi cao nhất Trái Đất"
    }
];

const questionElement = document.getElementById('question');
const answerButtons  = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;



// Bắt đầu
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    // Ẩn giải thích
    const explanationDiv = document.getElementById('answer-explanation');
    explanationDiv.classList.add('hidden');
    // Xáo trộn câu trả lời trước khi hiển thị câu hỏi
    questions.forEach(question => {
        question.answers = shuffleArray(question.answers);
    });
    showQuestion();
}

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Hiện câu hỏi
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const explanationDiv = document.getElementById('answer-explanation');
    const explanationText = document.getElementById('explanation-text');
    const currentQuestion = questions[currentQuestionIndex];
    const explanation = currentQuestion.explain;
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    if (isCorrect) {
        explanationText.innerHTML = `Giải thích : ${explanation}`;
    } else {
        explanationText.innerHTML = `Giải thích : ${explanation}`;
    }
    
    explanationDiv.classList.remove('hidden');

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
// Hàm điểm
function showScore () {
    resetState();
    questionElement.innerHTML = `Bạn đã làm đúng ${score} / ${questions.length}` ;
    if (score === questions.length) {
        showCongratulation();
    }
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}
// Hàm hiện hiệu ứng pháo hóa chúc mừng eneus đạt tối đa điểm
function showCongratulation() {
    const congratulationElement = document.getElementById('congratulation');
    congratulationElement.classList.remove('hidden');

    // Tạo hiệu ứng Confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

//Hàm Next
function handleNextButton (){
    const explanationDiv = document.getElementById('answer-explanation');
    explanationDiv.classList.add('hidden');
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else {
        showScore();
    }
}

// Sự kiện click button Next
nextButton.addEventListener("click" , () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
})
startQuiz();