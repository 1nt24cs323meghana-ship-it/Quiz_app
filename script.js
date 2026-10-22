

const bank = [
    // GENERAL KNOWLEDGE
    {category:"GK",difficulty:"Easy",q:"Which planet is called the Red Planet?",a:["Earth","Mars","Jupiter","Venus"],c:1},
    {category:"GK",difficulty:"Easy",q:"What is the largest ocean?",a:["Atlantic","Indian","Pacific","Arctic"],c:2},
    {category:"GK",difficulty:"Medium",q:"Which is the smallest continent by land area?",a:["Europe","Australia","South America","Antarctica"],c:1},
    {category:"GK",difficulty:"Medium",q:"How many sides does a hexagon have?",a:["5","6","7","8"],c:1},

    // PROGRAMMING
    {category:"Programming",difficulty:"Easy",q:"Which keyword defines a function in Python?",a:["func","define","def","function"],c:2},
    {category:"Programming",difficulty:"Easy",q:"Which language is mainly used to style web pages?",a:["HTML","CSS","SQL","Python"],c:1},
    {category:"Programming",difficulty:"Medium",q:"Which Python data structure stores key-value pairs?",a:["List","Dictionary","Tuple","String"],c:1},
    {category:"Programming",difficulty:"Medium",q:"What is the result of 3 ** 2 in Python?",a:["6","8","9","5"],c:2},

    // SQL & DATABASES
    {category:"SQL",difficulty:"Easy",q:"Which SQL command retrieves data?",a:["SELECT","DELETE","UPDATE","INSERT"],c:0},
    {category:"SQL",difficulty:"Easy",q:"Which clause filters rows in SQL?",a:["ORDER BY","WHERE","GROUP BY","JOIN"],c:1},
    {category:"SQL",difficulty:"Medium",q:"Which clause filters grouped SQL results?",a:["WHERE","ORDER BY","HAVING","LIMIT"],c:2},
    {category:"SQL",difficulty:"Medium",q:"Which key uniquely identifies each row in a table?",a:["Foreign key","Primary key","Duplicate key","Optional key"],c:1},

    // INDIA & NATIONAL EXAMS
    {category:"India",difficulty:"Easy",q:"What is the capital of India?",a:["Mumbai","New Delhi","Chennai","Kolkata"],c:1},
    {category:"India",difficulty:"Easy",q:"When did India become independent?",a:["1942","1945","1947","1950"],c:2},
    {category:"India",difficulty:"Medium",q:"Who chaired the Drafting Committee of the Indian Constitution?",a:["Jawaharlal Nehru","Rajendra Prasad","B. R. Ambedkar","Sardar Patel"],c:2},
    {category:"India",difficulty:"Medium",q:"Which body conducts elections to the Lok Sabha?",a:["UPSC","Election Commission of India","Supreme Court","Finance Commission"],c:1},

    // SCIENCE & NATURE
    {category:"Science",difficulty:"Easy",q:"Which gas do plants absorb during photosynthesis?",a:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],c:2},
    {category:"Science",difficulty:"Easy",q:"What is the chemical formula of water?",a:["CO2","H2O","O2","NaCl"],c:1},
    {category:"Science",difficulty:"Medium",q:"What is the SI unit of force?",a:["Joule","Newton","Watt","Pascal"],c:1},
    {category:"Science",difficulty:"Medium",q:"Which part of a cell contains most of its genetic material?",a:["Nucleus","Cell membrane","Cytoplasm","Ribosome"],c:0},

    // MATHEMATICS
    {category:"Maths",difficulty:"Easy",q:"What is 12 × 8?",a:["86","92","96","108"],c:2},
    {category:"Maths",difficulty:"Easy",q:"What is the square root of 144?",a:["10","11","12","14"],c:2},
    {category:"Maths",difficulty:"Medium",q:"What is 15% of 200?",a:["20","25","30","35"],c:2},
    {category:"Maths",difficulty:"Medium",q:"What is the sum of the interior angles of a triangle?",a:["90°","180°","270°","360°"],c:1},

    // SPORTS
    {category:"Sports",difficulty:"Easy",q:"How many players per team play on the field in football (soccer)?",a:["9","10","11","12"],c:2},
    {category:"Sports",difficulty:"Easy",q:"How many rings are on the Olympic symbol?",a:["4","5","6","7"],c:1},
    {category:"Sports",difficulty:"Medium",q:"The Thomas Cup is associated with which sport?",a:["Tennis","Badminton","Hockey","Football"],c:1},

    // HISTORY
    {category:"History",difficulty:"Easy",q:"In which year did the French Revolution begin?",a:["1776","1789","1815","1848"],c:1},

    // ENTERTAINMENT
    {category:"Entertainment",difficulty:"Easy",q:"Which instrument has black and white keys?",a:["Piano","Flute","Drum","Trumpet"],c:0},
    {category:"Entertainment",difficulty:"Medium",q:"Which award is associated with excellence in American cinema?",a:["Grammy","Oscar","Pulitzer","Booker"],c:1}
];


const names = {
    GK: "General Knowledge",
    Programming: "Programming",
    SQL: "SQL & Databases",
    India: "India & National Exams",
    Science: "Science & Nature",
    Maths: "Mathematics",
    Sports: "Sports",
    History: "History",
    Entertainment: "Entertainment"
};

let questions = [];
let current = 0;
let score = 0;
let locked = false;

function showHome() {
    document.getElementById("home").hidden = false;
    document.getElementById("quiz").hidden = true;
    document.getElementById("result").hidden = true;
}

function startQuiz() {
    const category = document.getElementById("category").value;
    const difficulty = document.getElementById("difficulty").value;

    let pool = bank.filter(q =>
        (category === "Random" || q.category === category) &&
        (difficulty === "All" || q.difficulty === difficulty)
    );

    // If a category has no questions at the chosen level,
    // use all questions from that category.
    if (pool.length === 0) {
        pool = bank.filter(q =>
            category === "Random" || q.category === category
        );
    }

    // Shuffle questions randomly.
    pool = [...pool].sort(() => Math.random() - 0.5);

    questions = pool.slice(0, Math.min(5, pool.length));
    current = 0;
    score = 0;

    document.getElementById("home").hidden = true;
    document.getElementById("result").hidden = true;
    document.getElementById("quiz").hidden = false;

    showQuestion();
}

function showQuestion() {
    locked = false;

    const q = questions[current];

    document.getElementById("topic").textContent =
        names[q.category];
    document.getElementById("counter").textContent =
        `Question ${current + 1}/${questions.length}`;
    document.getElementById("bar").style.width =
        `${(current / questions.length) * 100}%`;
    document.getElementById("question").textContent = q.q;
    document.getElementById("feedback").textContent = "";
    document.getElementById("next").hidden = true;
    document.getElementById("next").textContent =
        current === questions.length - 1 ? "See Results 🏆" : "Next Question →";

    const area = document.getElementById("answers");
    area.replaceChildren();

    q.a.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer";
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        button.onclick = () => checkAnswer(index);
        area.appendChild(button);
    });
}

function checkAnswer(index) {
    if (locked) return;
    locked = true;

    const q = questions[current];
    const buttons = document.querySelectorAll(".answer");

    buttons.forEach(button => button.disabled = true);
    buttons[q.c].classList.add("correct");

    if (index === q.c) {
        score++;
        document.getElementById("feedback").textContent =
            "🎉 Correct! Great job!";
    } else {
        buttons[index].classList.add("wrong");
        document.getElementById("feedback").textContent =
            `💡 Correct answer: ${q.a[q.c]}`;
    }

    document.getElementById("bar").style.width =
        `${((current + 1) / questions.length) * 100}%`;
    document.getElementById("next").hidden = false;
}

function nextQuestion() {
    if (!locked) return;

    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz").hidden = true;
        document.getElementById("result").hidden = false;
        document.getElementById("score").textContent =
            `${score} / ${questions.length}`;

        document.getElementById("message").textContent =
            score === questions.length ? "Perfect score! You're a legend! 🌟" :
            score >= 3 ? "Nice work! Keep learning! 🚀" :
            "Keep practising. You'll get better! 💪";
    }
}

showHome();
