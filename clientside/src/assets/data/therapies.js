import { assets } from "../assets";

const therapies = {
    purvakarma: [
        {
            id: "snehana",
            title: "Snehana — Oleation",
            desc: "Internal & external oil application",
            img: assets.img1,
            details: `
✔ Lubricates body internally & externally  
✔ Reduces stiffness & dryness  
✔ Enhances flexibility and joint movement  
✔ Helps release deep-seated toxins  
✔ Prepares body for Panchakarma procedures  
      `,
            dos: [
                "Take light, warm & easily digestible food",
                "Keep yourself relaxed before/after therapy",
                "Wear loose & breathable clothes"
            ],
            donts: [
                "No junk or spicy food",
                "Avoid alcohol, caffeine & smoking",
                "Avoid exposure to cold or AC"
            ],
            exercises: [
                "Neck & shoulder rotations",
                "Cat-Cow Stretch",
                "Deep breathing (Anulom Vilom)",
                "Gentle forward bending"
            ]
        },

        {
            id: "swedana",
            title: "Swedana — Sudation",
            desc: "Steam therapy",
            img: assets.img2,
            details: `
✔ Opens pores & removes toxins through sweat  
✔ Relieves body pain, muscle stiffness & fatigue  
✔ Enhances blood circulation  
✔ Makes toxins ready for expulsion  
      `,
            dos: [
                "Drink warm water",
                "Take rest after therapy",
                "Light meals recommended"
            ],
            donts: [
                "Avoid cold drinks immediately",
                "Do not take shower right after",
                "Avoid sun exposure post-therapy"
            ],
            exercises: [
                "Light walking",
                "Joint mobility exercises"
            ]
        },
    ],

    pradhana: [
        {
            id: "vamana",
            title: "Vamana — Emesis Therapy",
            desc: "Therapeutic vomiting",
            img: assets.img3,
            details: `
✔ Removes excess *Kapha dosha*  
✔ Relieves chronic cough, asthma, sinusitis  
✔ Clears respiratory passages  
✔ Improves digestion & metabolism  
      `,
            dos: [
                "Follow prescribed diet before therapy",
                "Stay mentally calm",
                "Hydrate with warm water"
            ],
            donts: [
                "Avoid overeating after procedure",
                "Avoid cold foods",
                "Do not sleep immediately post-therapy"
            ],
            exercises: [
                "Gentle breathing exercises",
                "Neck & chest expansion yoga"
            ]
        },

        {
            id: "virechana",
            title: "Virechana — Purgation Therapy",
            desc: "Cleanse Pitta-related disorders",
            img: assets.img4,
            details: `
✔ Eliminates excess *Pitta dosha*  
✔ Useful in acidity, liver issues, skin diseases  
✔ Improves appetite & digestion  
✔ Detoxifies GI tract  
      `,
            dos: [
                "Drink warm water",
                "Light, liquid diet after therapy",
                "Rest properly"
            ],
            donts: [
                "Avoid spicy, fried foods",
                "No exercise post-therapy",
                "Do not suppress natural urges"
            ],
            exercises: [
                "Very light walking only"
            ]
        },

        {
            id: "basti",
            title: "Basti Therapy — Medicated Enema",
            desc: "Colon detox therapy",
            img: assets.img5,
            details: `
✔ Best therapy for balancing *Vata dosha*  
✔ Treats constipation, arthritis, back pain  
✔ Nourishes colon & reproductive system  
✔ Improves strength & vitality  
      `,
            dos: [
                "Warm & soft food",
                "Follow doctor’s dietary advice",
                "Stay calm and avoid stress"
            ],
            donts: [
                "Avoid cold exposure",
                "Avoid heavy meals after therapy",
                "Do not do vigorous exercise"
            ],
            exercises: [
                "Pelvic tilt",
                "Child pose",
                "Hip mobility stretches"
            ]
        },

        {
            id: "nasya",
            title: "Nasya — Nasal Administration",
            desc: "Herbal oils in nose",
            img: assets.img6,
            details: `
✔ Clears sinuses & nasal congestion  
✔ Enhances memory & concentration  
✔ Treats migraines, cervical issues  
✔ Improves breathing function  
      `,
            dos: [
                "Stay warm after therapy",
                "Light head massage helpful",
                "Hydrate well"
            ],
            donts: [
                "Avoid cold foods & exposure",
                "No direct fan/AC wind",
                "Do not sleep immediately"
            ],
            exercises: [
                "Neck rotations",
                "Anulom Vilom",
                "Bhramari breathing"
            ]
        },
    ],

    kerala: [
        {
            id: "abhyanga",
            title: "Abhyanga — Full Body Oil Massage",
            desc: "Herbal oil rejuvenation",
            img: assets.img7,
            details: `
✔ Revitalizes skin & muscles  
✔ Improves circulation & sleep quality  
✔ Reduces stress & fatigue  
✔ Balances Vata & calming for mind  
      `,
            dos: [
                "Warm water bath recommended after session",
                "Stay relaxed for 1-2 hours"
            ],
            donts: [
                "Avoid cold water bath immediately",
                "Avoid heavy meals before session"
            ],
            exercises: [
                "Gentle body stretching",
                "Light walking"
            ]
        },

        {
            id: "pada-abhyanga",
            title: "Pada Abhyanga — Foot Massage",
            desc: "Stimulates nerve endings",
            img: assets.img8,
            details: `
✔ Improves vision & brain function  
✔ Relaxes the central nervous system  
✔ Helps in insomnia, anxiety & fatigue  
      `,
            dos: ["Soak feet in warm water", "Relax after therapy"],
            donts: ["Avoid walking barefoot on cold floors"],
            exercises: ["Foot rotations", "Toe flexing"]
        },

        {
            id: "shiro-abhyanga",
            title: "Shiro Abhyanga — Head Massage",
            desc: "Stress relief therapy",
            img: assets.img9,
            details: `
✔ Improves scalp health & hair growth  
✔ Reduces stress, anxiety, headaches  
✔ Enhances clarity & mental peace  
      `,
            dos: ["Sit relaxed", "Warm oil application"],
            donts: ["Avoid using shampoo immediately"],
            exercises: ["Neck stretch", "Eye relaxation yoga"]
        },

        {
            id: "shirodhara",
            title: "Shirodhara — Oil Pouring Therapy",
            desc: "Deep mental relaxation",
            img: assets.img10,
            details: `
✔ Reduces stress & anxiety  
✔ Improves sleep & calms nervous system  
✔ Helpful in migraines, depression  
      `,
            dos: ["Lie down peacefully post-therapy"],
            donts: ["Avoid sudden head movement", "Avoid AC/fan"],
            exercises: ["Deep breathing", "Meditation"]
        }
    ]
};

export default therapies;