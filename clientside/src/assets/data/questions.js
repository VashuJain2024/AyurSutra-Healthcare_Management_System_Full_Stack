const questions = [
    {
        id: 1,
        key: "physical_frame",
        question: "Which of these best describes your physical frame?",
        options: [
            { label: "Small", dosha: "Vata" },
            { label: "Medium", dosha: "Pitta" },
            { label: "Large", dosha: "Kapha" },
        ],
    },
    {
        id: 2,
        key: "skin",
        question: "Which best describes your skin?",
        options: [
            { label: "Oily and soft with freckles or pimples", dosha: "Pitta" },
            { label: "Thick, oily, cool skin", dosha: "Kapha" },
            { label: "Dry", dosha: "Vata" },
        ],
    },
    {
        id: 3,
        key: "hair",
        question: "Which best describes your hair?",
        options: [
            { label: "Straight and fine", dosha: "Pitta" },
            { label: "Thick and lustrous", dosha: "Kapha" },
            { label: "Dry and curly", dosha: "Vata" },
        ],
    },
    {
        id: 4,
        key: "eyes",
        question: "Which best describes your eyes?",
        options: [
            { label: "Large, pretty", dosha: "Kapha" },
            { label: "Small and dry", dosha: "Vata" },
            { label: "Medium-sized; intense gaze", dosha: "Pitta" },
        ],
    },
    {
        id: 5,
        key: "speech",
        question: "Which best describes how you talk?",
        options: [
            { label: "Fast and/or a lot!", dosha: "Vata" },
            { label: "My words are sharp and concise.", dosha: "Pitta" },
            { label: "My speech is slow and calm.", dosha: "Kapha" },
        ],
    },
    {
        id: 6,
        key: "weather",
        question: "What type of weather is your favorite?",
        options: [
            { label: "Warm", dosha: "Vata" },
            { label: "Cool", dosha: "Kapha" },
            { label: "Cool and dry", dosha: "Pitta" },
        ],
    },
    {
        id: 7,
        key: "memory",
        question: "How is your memory?",
        options: [
            { label: "I learn quickly, but I also forget quickly.", dosha: "Vata" },
            { label: "I have a great memory!", dosha: "Pitta" },
            {
                label:
                    "It takes me a while to commit something to memory, but once I do I don’t forget it.",
                dosha: "Kapha",
            },
        ],
    },
    {
        id: 8,
        key: "personality",
        question: "Which best describes your personality?",
        options: [
            { label: "Responsible, nurturing, and sensitive", dosha: "Kapha" },
            { label: "Creative, joyful, and introspective", dosha: "Vata" },
            { label: "Competitive, perceptive, and efficient", dosha: "Pitta" },
        ],
    },
    {
        id: 9,
        key: "traits_1",
        question: "Which of these traits do you most identify with?",
        options: [
            { label: "I can be pretty stubborn.", dosha: "Kapha" },
            { label: "I get jealous easily.", dosha: "Pitta" },
            { label: "I’m often indecisive.", dosha: "Vata" },
        ],
    },
    {
        id: 10,
        key: "traits_2",
        question: "How about these traits? Which sounds the most like you?",
        options: [
            { label: "I’m very intuitive.", dosha: "Vata" },
            { label: "I’m quite brave.", dosha: "Pitta" },
            { label: "I’m a loyal, faithful friend.", dosha: "Kapha" },
        ],
    },
    {
        id: 11,
        key: "traits_3",
        question: "And these? Which sounds the most like you?",
        options: [
            { label: "I’m often restless.", dosha: "Vata" },
            { label: "I can be irritable and impatient.", dosha: "Pitta" },
            { label: "I’m a loyal, faithful friend.", dosha: "Kapha" },
        ],
    },

    // Stress-related (Yes = dosha imbalance)
    {
        id: 12,
        key: "insomnia",
        question: "When you’re under stress, do you experience insomnia?",
        options: [
            { label: "Yes", dosha: "Vata" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 13,
        key: "complacent",
        question: "When you’re under stress, do you feel complacent?",
        options: [
            { label: "Yes", dosha: "Kapha" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 14,
        key: "rashes",
        question: "When you’re under stress, do you develop rashes or hives?",
        options: [
            { label: "Yes", dosha: "Pitta" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 15,
        key: "lose_weight",
        question: "When you’re under stress, do you lose weight?",
        options: [
            { label: "Yes", dosha: "Vata" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 16,
        key: "constipation",
        question:
            "When you’re under stress, do you experience constipation or excess gas?",
        options: [
            { label: "Yes", dosha: "Vata" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 17,
        key: "appetite",
        question:
            "When you’re under stress, do you overeat or lose your appetite?",
        options: [
            { label: "Yes", dosha: "Kapha" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 18,
        key: "alcohol",
        question: "When you’re under stress, do you drink alcohol to excess?",
        options: [
            { label: "Yes", dosha: "Pitta" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 19,
        key: "lazy",
        question: "When you’re under stress, do you feel lazy or inert?",
        options: [
            { label: "Yes", dosha: "Kapha" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 20,
        key: "temper",
        question: "When you’re under stress, do you easily lose your temper?",
        options: [
            { label: "Yes", dosha: "Pitta" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 21,
        key: "water_retention",
        question: "When you’re under stress, do you retain water?",
        options: [
            { label: "Yes", dosha: "Kapha" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 22,
        key: "seek_change",
        question: "When you’re under stress, do you seek change?",
        options: [
            { label: "Yes", dosha: "Vata" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 23,
        key: "sweat",
        question:
            "When you’re under stress, do you sweat a lot or have excess body odor?",
        options: [
            { label: "Yes", dosha: "Pitta" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 24,
        key: "anxiety",
        question: "When you’re under stress, do you feel anxious or fearful?",
        options: [
            { label: "Yes", dosha: "Vata" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 25,
        key: "spicy_food",
        question: "When you’re under stress, do you eat hot, spicy foods?",
        options: [
            { label: "Yes", dosha: "Pitta" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 26,
        key: "gastritis",
        question: "When you’re under stress, do you experience gastritis or ulcers?",
        options: [
            { label: "Yes", dosha: "Pitta" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 27,
        key: "restless",
        question: "When you’re under stress, do you feel restless?",
        options: [
            { label: "Yes", dosha: "Vata" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 28,
        key: "sleep_more",
        question: "When you’re under stress, do you sleep a lot?",
        options: [
            { label: "Yes", dosha: "Kapha" },
            { label: "No", dosha: null },
        ],
    },
    {
        id: 29,
        key: "weight_gain",
        question: "When you’re under stress, do you put on weight?",
        options: [
            { label: "Yes", dosha: "Kapha" },
            { label: "No", dosha: null },
        ],
    },
];

export default questions;
