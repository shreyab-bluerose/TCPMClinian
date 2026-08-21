/* =========================================================
   TCPM RECOMMENDATION LIBRARY
   Source: Clinical Biomarker Interpretation Tool
   Design & Development Brief
========================================================= */

const recommendationLibrary = {

    /* =====================================================
       STAGE 1
       Prevention and Resilience
    ===================================================== */

    "Stage 1": [

        {
            stage: 1,
            title: "Mindfulness-Based Stress Reduction (MBSR)",
            category: "Inflammatory",
            evidence: "Strong",
            mechanism:
                "May reduce early inflammatory signaling and support regulatory capacity.",
            reference:
                "Davidson et al. (2003). Psychosom Med, 65(4):564–570.",
            pmid: "12883117",
            flag: ""
        },

        {
            stage: 1,
            title: "Somatic awareness practices",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May build interoceptive capacity before symptoms are established.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 1,
            title: "Polyvagal-informed psychoeducation",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May help patients recognize and respond to nervous-system states.",
            reference:
                "Porges (2011). The Polyvagal Theory. Norton.",
            pmid: "",
            flag: ""
        },

        {
            stage: 1,
            title: "Mediterranean-style diet",
            category: "Inflammatory",
            evidence: "Strong",
            mechanism:
                "May reduce inflammatory signaling baseline.",
            reference:
                "Keshani et al. (2025). Nutr Rev.",
            pmid: "41211687",
            flag: ""
        },

        {
            stage: 1,
            title: "Omega-3 fatty acids (EPA/DHA)",
            category: "Inflammatory",
            evidence: "Strong",
            mechanism:
                "May reduce pro-inflammatory signaling.",
            reference:
                "Kavyani et al. (2022). Int Immunopharmacol.",
            pmid: "35914448",
            flag:
                "Discuss supplementation with the treating clinician."
        },

        {
            stage: 1,
            title: "Aerobic exercise 150+ min/week",
            category: "Inflammatory",
            evidence: "Strong",
            mechanism:
                "May support reduction of inflammatory signaling.",
            reference:
                "Zheng et al. (2019). Front Aging Neurosci.",
            pmid: "31080412",
            flag: ""
        },

        {
            stage: 1,
            title: "Sleep optimization and CBT-I",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "Supports recovery and regulation of stress and immune systems.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 1,
            title: "Vitamin D3 sufficiency",
            category: "Inflammatory",
            evidence: "Moderate",
            mechanism:
                "May support immune regulation and endothelial stability.",
            reference:
                "Gibson et al. (2015). PLoS One.",
            pmid: "26451598",
            flag:
                "Discuss supplementation with the treating clinician."
        }

    ],


    /* =====================================================
       STAGE 2
       Stabilization and Load Reduction
    ===================================================== */

    "Stage 2": [

        {
            stage: 2,
            title: "Somatic Experiencing (SE)",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "Uses bottom-up processing to address physiological stress adaptation.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 2,
            title: "Internal Family Systems (IFS)",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "Works with protective parts maintaining stress adaptation.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 2,
            title: "EMDR resourcing and stabilization phases",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "Emphasizes resourcing and stabilization before deeper processing.",
            reference:
                "Bisson et al. (2007). Br J Psychiatry, 190:97–104.",
            pmid: "17267924",
            flag:
                "Resourcing and stabilization should precede intensive processing."
        },

        {
            stage: 2,
            title: "Trauma-informed yoga and somatic stabilization",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May support regulation and stabilization during periods of biological load.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 2,
            title: "Curcumin",
            category: "Inflammatory",
            evidence: "Moderate",
            mechanism:
                "May reduce inflammatory and oxidative burden.",
            reference:
                "Naghsh et al. (2023). Curcumin and inflammatory biomarkers.",
            pmid: "36700039",
            flag:
                "Discuss supplementation with the treating clinician."
        },

        {
            stage: 2,
            title: "N-Acetylcysteine (NAC)",
            category: "Oxidative",
            evidence: "Moderate",
            mechanism:
                "May reduce oxidative stress and metabolic strain.",
            reference:
                "Askari et al. (2020). Cytokine.",
            pmid: "32799012",
            flag:
                "Discuss supplementation with the treating clinician."
        },

        {
            stage: 2,
            title: "Magnesium glycinate or threonate",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May support GABAergic tone and anti-inflammatory processes.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag:
                "Discuss supplementation with the treating clinician."
        },

        {
            stage: 2,
            title: "Gut microbiome support",
            category: "Immune",
            evidence: "Moderate",
            mechanism:
                "May support immune regulation through prebiotic fiber and probiotic approaches.",
            reference:
                "Braniste et al. (2014). Sci Transl Med.",
            pmid: "25411471",
            flag: ""
        },

        {
            stage: 2,
            title: "Moderate-intensity aerobic exercise",
            category: "Inflammatory",
            evidence: "Strong",
            mechanism:
                "May support anti-inflammatory signaling when performed consistently.",
            reference:
                "Petersen & Pedersen (2005). J Appl Physiol, 98(4):1154–1162.",
            pmid: "15772055",
            flag: ""
        },

        {
            stage: 2,
            title: "Sauna / heat therapy where medically appropriate",
            category: "Metabolic",
            evidence: "Moderate",
            mechanism:
                "May provide a supportive lifestyle intervention where appropriate.",
            reference:
                "Patrick & Johnson (2021). Exp Gerontol.",
            pmid: "34363927",
            flag:
                "Screen for cardiovascular contraindications."
        }

    ],


    /* =====================================================
       STAGE 3
       Neuroimmune Support and Pacing Priority
    ===================================================== */

    "Stage 3": [

        {
            stage: 3,
            title: "Titrated EMDR",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "Uses resourcing emphasis, shorter processing windows, and careful monitoring.",
            reference:
                "Bisson et al. (2007). Br J Psychiatry, 190:97–104.",
            pmid: "17267924",
            flag:
                "Monitor post-session recovery closely."
        },

        {
            stage: 3,
            title: "Grounding and orienting practices",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May support sensory and relational regulation during neuroimmune stress.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 3,
            title: "Neurofeedback / HRV biofeedback",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May support vagal tone and the sympathetic-immune axis.",
            reference:
                "Thayer & Lane (2009). Biol Psychol.",
            pmid: "19186205",
            flag: ""
        },

        {
            stage: 3,
            title: "Attachment-based and relational safety work",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "May support regulation through relational and safety-oriented therapeutic work.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag:
                "Monitor post-session recovery for cognitive fog, sensory overload, and symptom escalation."
        },

        {
            stage: 3,
            title: "Omega-3 fatty acids at higher evidence-based range",
            category: "Inflammatory",
            evidence: "Strong",
            mechanism:
                "May support neuronal membrane and BBB-related function.",
            reference:
                "Kavyani et al. (2022). Int Immunopharmacol.",
            pmid: "35914448",
            flag:
                "Discuss supplementation with the patient's primary care or prescribing physician."
        },

        {
            stage: 3,
            title: "NAC and antioxidant support",
            category: "Oxidative",
            evidence: "Moderate",
            mechanism:
                "May address the oxidative-stress component of the biological pattern.",
            reference:
                "Askari et al. (2020). Cytokine.",
            pmid: "32799012",
            flag:
                "Discuss supplementation with the treating clinician."
        },

        {
            stage: 3,
            title: "Vitamin D3, especially if deficient",
            category: "Inflammatory",
            evidence: "Moderate",
            mechanism:
                "May support endothelial junction stability relevant to BBB function.",
            reference:
                "Gibson et al. (2015). PLoS One.",
            pmid: "26451598",
            flag:
                "Discuss supplementation with the treating clinician."
        },

        {
            stage: 3,
            title: "Low-to-moderate aerobic exercise (not high-intensity)",
            category: "Inflammatory",
            evidence: "Moderate",
            mechanism:
                "May support anti-inflammatory signaling while avoiding excessive physiological load.",
            reference:
                "Zhang et al. (2025). PMID: 40331377.",
            pmid: "40331377",
            flag: ""
        },

        {
            stage: 3,
            title: "Sleep prioritization - protect slow-wave sleep",
            category: "Oxidative",
            evidence: "Strong",
            mechanism:
                "Slow-wave sleep supports clearance of neuroinflammatory byproducts.",
            reference:
                "Walker (2017). Why We Sleep.",
            pmid: "",
            flag: ""
        },

        {
            stage: 3,
            title: "Vagal breathing - 5–6 breaths/min",
            category: "Neuroimmune",
            evidence: "Moderate",
            mechanism:
                "May support vagal tone and the cholinergic anti-inflammatory pathway.",
            reference:
                "Thayer & Lane (2009). Biol Psychol.",
            pmid: "19186205",
            flag: ""
        },

        {
            stage: 3,
            title: "Stage 3 pacing priority",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "Regulation capacity should precede deeper processing when neuroimmune and BBB-related signaling is prominent.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag:
                "Monitor post-session for cognitive fog, sensory overload, and symptom escalation."
        }

    ],


    /* =====================================================
       STAGE 4
       Based on the brief: Stage 2 + Stage 3 recommendations
       plus prevention-window emphasis.
    ===================================================== */

    "Stage 4": [

        {
            stage: 4,
            title: "Monitoring and early supportive intervention",
            category: "Immune",
            evidence: "Moderate",
            mechanism:
                "The prevention window emphasizes monitoring, stabilization, resilience building, and early supportive intervention.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 4,
            title: "Stress-load reduction and pacing",
            category: "Inflammatory",
            evidence: "Moderate",
            mechanism:
                "May help reduce accumulating biological burden during the prevention window.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        },

        {
            stage: 4,
            title: "Sleep and recovery optimization",
            category: "Oxidative",
            evidence: "Strong",
            mechanism:
                "Supports regulation and resilience while biological burden is building.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag: ""
        }

    ],


    /* =====================================================
       STAGE 5
       Additional considerations from the brief
    ===================================================== */

    "Stage 5": [

        {
            stage: 5,
            title: "Integrated symptom-reduction support",
            category: "Neuroimmune",
            evidence: "Strong",
            mechanism:
                "Stage 5 emphasizes stabilization, pacing, functional recovery, and integrated support.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief.",
            pmid: "",
            flag:
                "Clinician judgment should guide the overall care plan."
        },

        {
            stage: 5,
            title: "Medical evaluation referral",
            category: "Clinical",
            evidence: "Clinical consideration",
            mechanism:
                "The brief identifies medical evaluation as clinically appropriate at Stage 5 biological burden.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief — Stages 4 and 5.",
            pmid: "",
            flag:
                "Medical evaluation is clinically appropriate at Stage 5 biological burden."
        },

        {
            stage: 5,
            title: "Integrated care coordination",
            category: "Clinical",
            evidence: "Moderate",
            mechanism:
                "Coordination among psychiatry, primary care, and trauma therapy may support integrated care.",
            reference:
                "Clinical Biomarker Interpretation Tool Design Brief — Stages 4 and 5.",
            pmid: "",
            flag: ""
        },

        {
            stage: 5,
            title: "Nutritional psychiatry consultation",
            category: "Inflammatory",
            evidence: "Moderate",
            mechanism:
                "May provide additional nutritional support within an integrated clinical framework.",
            reference:
                "Jacka et al. (2017). BMC Med, 15:23.",
            pmid: "28137247",
            flag: ""
        }

    ]

};