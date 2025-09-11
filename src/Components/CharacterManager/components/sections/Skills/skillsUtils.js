import { standardFeats, backgroundsData } from "../../../../../SharedData";
import { heritageDescriptions } from "../../../../../SharedData/heritageData";

export const skillsByCastingStyle = {
  "Willpower Caster": [
    "Athletics",
    "Acrobatics",
    "Deception",
    "Intimidation",
    "History of Magic",
    "Magical Creatures",
    "Persuasion",
    "Sleight of Hand",
    "Survival",
  ],
  "Technique Caster": [
    "Acrobatics",
    "Herbology",
    "Magical Theory",
    "Insight",
    "Perception",
    "Potion Making",
    "Sleight of Hand",
    "Stealth",
  ],
  "Intellect Caster": [
    "Acrobatics",
    "Herbology",
    "Magical Theory",
    "Insight",
    "Investigation",
    "Magical Creatures",
    "History of Magic",
    "Medicine",
    "Muggle Studies",
    "Survival",
  ],
  "Vigor Caster": [
    "Athletics",
    "Acrobatics",
    "Deception",
    "Stealth",
    "Magical Creatures",
    "Medicine",
    "Survival",
    "Intimidation",
    "Performance",
  ],
};

export const SKILL_ABILITY_MAP = {
  Acrobatics: "dexterity",
  "Animal Handling": "wisdom",
  Arcana: "intelligence",
  Athletics: "strength",
  Deception: "charisma",
  History: "intelligence",
  Insight: "wisdom",
  Intimidation: "charisma",
  Investigation: "intelligence",
  Medicine: "wisdom",
  Nature: "intelligence",
  Perception: "wisdom",
  Persuasion: "charisma",
  Religion: "intelligence",
  "Sleight of Hand": "dexterity",
  Stealth: "dexterity",
  Survival: "wisdom",
  Herbology: "intelligence",
  "History of Magic": "intelligence",
  "Magical Theory": "intelligence",
  "Muggle Studies": "intelligence",
  "Magical Creatures": "wisdom",
  "Potion Making": "intelligence",
};

export const SKILL_SOURCES = {
  BACKGROUND: { source: "Background", color: "#ef4444", label: "B" },
  HERITAGE: { source: "Heritage", color: "#8b5cf6", label: "H" },
  SUBCLASS: { source: "Subclass", color: "#06b6d4", label: "S" },
  STUDY_BUDDY: { source: "Study Buddy", color: "#10b981", label: "SB" },
  CASTING_STYLE: { source: "Casting Style", color: "#f59e0b", label: "C" },
  FEAT: { source: "Feat", color: "#ec4899", label: "F" },
  UNKNOWN: { source: "Unknown", color: "#6b7280", label: "?" },
};

export const SUBCLASS_SKILL_NAMES = [
  "Herbology",
  "History of Magic",
  "Investigation",
  "Magical Theory",
  "Muggle Studies",
];

// Helper function to compute background skills from character's current background
export const computeBackgroundSkills = (character) => {
  if (!character.background) return [];
  
  const background = backgroundsData[character.background];
  if (!background || !background.skillProficiencies) return [];
  
  return [...background.skillProficiencies];
};

// Helper function to check heritage for skill proficiencies
const checkForSkillProficiencies = (heritage) => {
  if (!heritage || !heritage.features) return [];
  
  const skills = [];
  heritage.features.forEach((feature) => {
    if (feature.skillProficiencies) {
      skills.push(...feature.skillProficiencies);
    }
  });
  
  return skills;
};

// Helper function to compute heritage skills from character's current heritage choices
export const computeHeritageSkills = (character) => {
  if (!character.innateHeritage) return [];
  
  const heritage = heritageDescriptions[character.innateHeritage];
  if (!heritage) return [];
  
  const heritageSkills = checkForSkillProficiencies(heritage);
  
  // Add choice-based skills from heritage choices
  const choiceSkills = [];
  if (heritage.features && character.heritageChoices && character.heritageChoices[character.innateHeritage]) {
    const choices = character.heritageChoices[character.innateHeritage];
    heritage.features.forEach((feature, featureIndex) => {
      if (feature.choices) {
        feature.choices.forEach((choice, choiceIndex) => {
          const choiceKey = `${featureIndex}_${choiceIndex}`;
          const selectedChoice = choices[choiceKey];
          if (selectedChoice && choice.skillProficiencies) {
            if (choice.skillProficiencies.includes(selectedChoice)) {
              choiceSkills.push(selectedChoice);
            }
          }
        });
      }
    });
  }
  
  return [...heritageSkills, ...choiceSkills];
};

export const getAvailableSkillsForCastingStyle = (castingStyle) => {
  return castingStyle ? skillsByCastingStyle[castingStyle] || [] : [];
};

export const hasSkillProficiency = (character, skill) => {
  const skillProficiencies =
    character.skillProficiencies || character.skill_proficiencies || [];
  return skillProficiencies.includes(skill);
};

export const hasSkillExpertise = (character, skill) => {
  const expertiseSkills =
    character.skill_expertise || character.skillExpertise || [];
  return expertiseSkills.includes(skill);
};

export const parseFeatSkills = (character) => {
  const featSkills = [];
  const featChoices = character.featChoices || {};
  const selectedFeats = [
    ...(character.standardFeats || []),
    ...Object.values(character.asiChoices || {})
      .filter((choice) => choice.type === "feat" && choice.selectedFeat)
      .map((choice) => choice.selectedFeat),
  ];

  selectedFeats.forEach((featName) => {
    const feat = standardFeats.find((f) => f.name === featName);
    if (!feat?.benefits?.skillProficiencies) return;

    feat.benefits.skillProficiencies.forEach((skillProf, index) => {
      if (typeof skillProf === "object" && skillProf.type === "choice") {
        const choiceKey = `${featName}_skill_${index}`;
        const selectedSkill = featChoices[choiceKey];

        if (selectedSkill) {
          featSkills.push(selectedSkill);
        }
      } else if (typeof skillProf === "string") {
        featSkills.push(skillProf);
      }
    });
  });

  return featSkills;
};

export const parseSubclassSkills = (character) => {
  const subclassSkills = [];
  const expertiseSkills = [];
  const studyBuddySkills = [];
  const hasExpertiseGranter = [];
  const subclassChoices = character.subclassChoices || {};

  // Use the same computed skills logic here for consistency
  const backgroundSkills = character.backgroundSkills?.length > 0 
    ? character.backgroundSkills 
    : computeBackgroundSkills(character);
  const innateHeritageSkills = character.innateHeritageSkills?.length > 0
    ? character.innateHeritageSkills
    : computeHeritageSkills(character);

  Object.values(subclassChoices).forEach((choice) => {
    if (typeof choice === "object" && choice.mainChoice && choice.subChoice) {
      if (choice.mainChoice === "Study Buddy") {
        const selectedSkill = choice.subChoice;
        studyBuddySkills.push(selectedSkill);

        const hasFromOtherSource =
          backgroundSkills.includes(selectedSkill) ||
          innateHeritageSkills.includes(selectedSkill);

        if (hasFromOtherSource) {
          expertiseSkills.push(selectedSkill);
        } else {
          subclassSkills.push(selectedSkill);
        }
      }
    } else if (typeof choice === "string") {
      if (choice === "Practice Makes Perfect") {
        hasExpertiseGranter.push("Practice Makes Perfect");
      }

      if (SUBCLASS_SKILL_NAMES.includes(choice)) {
        subclassSkills.push(choice);
      }
    }
  });

  return {
    subclassSkills,
    expertiseSkills,
    studyBuddySkills,
    hasExpertiseGranter,
  };
};

export const organizeSkillsBySource = (character) => {
  const allSkillProficiencies =
    character.skillProficiencies || character.skill_proficiencies || [];
  const availableCastingSkills = getAvailableSkillsForCastingStyle(
    character.castingStyle
  );
  
  // Use stored arrays if they exist, otherwise compute them from current character choices
  const backgroundSkills = character.backgroundSkills?.length > 0 
    ? character.backgroundSkills 
    : computeBackgroundSkills(character);
  const innateHeritageSkills = character.innateHeritageSkills?.length > 0
    ? character.innateHeritageSkills
    : computeHeritageSkills(character);
  
  const featSkills = parseFeatSkills(character);

  const {
    subclassSkills,
    expertiseSkills,
    studyBuddySkills,
    hasExpertiseGranter,
  } = parseSubclassSkills(character);

  const selectedCastingStyleSkills = allSkillProficiencies.filter((skill) => {
    if (!availableCastingSkills.includes(skill)) return false;

    // Skills from other sources don't count toward casting style selection limit
    if (
      backgroundSkills.includes(skill) ||
      innateHeritageSkills.includes(skill) ||
      subclassSkills.includes(skill) ||
      featSkills.includes(skill)
    ) {
      return false;
    }

    return true;
  });

  return {
    availableCastingSkills,
    selectedCastingStyleSkills,
    backgroundSkills,
    innateHeritageSkills,
    subclassSkills,
    expertiseSkills,
    studyBuddySkills,
    hasExpertiseGranter,
    featSkills,
    allSkillProficiencies,
  };
};

export const getSkillSource = (character, skill) => {
  const {
    backgroundSkills,
    innateHeritageSkills,
    subclassSkills,
    studyBuddySkills,
    selectedCastingStyleSkills,
    featSkills,
  } = organizeSkillsBySource(character);

  if (backgroundSkills.includes(skill)) return SKILL_SOURCES.BACKGROUND;
  if (innateHeritageSkills.includes(skill)) return SKILL_SOURCES.HERITAGE;
  if (subclassSkills.includes(skill)) return SKILL_SOURCES.SUBCLASS;
  if (studyBuddySkills.includes(skill)) return SKILL_SOURCES.STUDY_BUDDY;
  if (featSkills.includes(skill)) return SKILL_SOURCES.FEAT;
  if (selectedCastingStyleSkills.includes(skill))
    return SKILL_SOURCES.CASTING_STYLE;

  return SKILL_SOURCES.UNKNOWN;
};

export const canSelectSkillForExpertise = (character, skill) => {
  const { hasExpertiseGranter } = parseSubclassSkills(character);
  return (
    hasExpertiseGranter.length > 0 && hasSkillProficiency(character, skill)
  );
};

export const isSkillAutomatic = (character, skill) => {
  const {
    backgroundSkills,
    innateHeritageSkills,
    subclassSkills,
    studyBuddySkills,
    featSkills,
  } = organizeSkillsBySource(character);

  const isAutomatic =
    backgroundSkills.includes(skill) ||
    innateHeritageSkills.includes(skill) ||
    subclassSkills.includes(skill) ||
    studyBuddySkills.includes(skill) ||
    featSkills.includes(skill);

  const canExpertise = canSelectSkillForExpertise(character, skill);

  return isAutomatic && !canExpertise;
};

export const calculateSkillModifier = (character, skill) => {
  const ability = SKILL_ABILITY_MAP[skill] || "intelligence";
  const abilityScore = character.ability_scores?.[ability] || 10;
  const abilityMod = Math.floor((abilityScore - 10) / 2);
  const profBonus = Math.ceil((character.level || 1) / 4) + 1;

  let bonus = abilityMod;
  if (hasSkillProficiency(character, skill)) {
    bonus += hasSkillExpertise(character, skill) ? profBonus * 2 : profBonus;
  }

  return bonus >= 0 ? `+${bonus}` : `${bonus}`;
};

export const getAllCharacterSkills = (character) => {
  const {
    allSkillProficiencies,
    backgroundSkills,
    innateHeritageSkills,
    subclassSkills,
    studyBuddySkills,
    featSkills,
  } = organizeSkillsBySource(character);

  return [
    ...new Set([
      ...allSkillProficiencies,
      ...backgroundSkills,
      ...innateHeritageSkills,
      ...subclassSkills,
      ...studyBuddySkills,
      ...featSkills,
    ]),
  ];
};

export const validateSkillSelection = (character, skill, isAdding) => {
  const { availableCastingSkills, selectedCastingStyleSkills } =
    organizeSkillsBySource(character);

  const errors = [];

  if (isAdding) {
    const isFromCastingStyle = availableCastingSkills.includes(skill);
    if (isFromCastingStyle && selectedCastingStyleSkills.length >= 2) {
      errors.push(
        `Cannot select ${skill} - already have 2 casting style skills`
      );
    }

    if (isSkillAutomatic(character, skill)) {
      errors.push(
        `Cannot select ${skill} - it's automatically granted from another source`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const processSkillToggle = (character, skill, onUpdate) => {
  const currentSkills = character.skillProficiencies || [];
  const isCurrentlySelected = currentSkills.includes(skill);

  const validation = validateSkillSelection(
    character,
    skill,
    !isCurrentlySelected
  );
  if (!validation.isValid) {
    console.warn("Skill selection validation failed:", validation.errors);
    return { success: false, errors: validation.errors };
  }

  const updates = {};

  if (isCurrentlySelected) {
    if (
      canSelectSkillForExpertise(character, skill) &&
      hasSkillExpertise(character, skill)
    ) {
      const currentExpertise =
        character.skill_expertise || character.skillExpertise || [];
      const newExpertise = currentExpertise.filter((s) => s !== skill);
      updates.skill_expertise = newExpertise;
      if (character.skillExpertise) {
        updates.skillExpertise = newExpertise;
      }
    } else {
      const newSkills = currentSkills.filter((s) => s !== skill);
      updates.skillProficiencies = newSkills;
    }
  } else {
    if (canSelectSkillForExpertise(character, skill)) {
      const currentExpertise =
        character.skill_expertise || character.skillExpertise || [];
      const newExpertise = [...new Set([...currentExpertise, skill])];
      updates.skill_expertise = newExpertise;
      if (character.skillExpertise) {
        updates.skillExpertise = newExpertise;
      }
    } else {
      const newSkills = [...currentSkills, skill];
      updates.skillProficiencies = newSkills;
    }
  }

  Object.entries(updates).forEach(([field, value]) => {
    onUpdate(field, value);
  });

  return { success: true, updates };
};

export const getSkillsForDisplay = (character) => {
  const allSkills = getAllCharacterSkills(character);

  return allSkills.map((skill) => ({
    name: skill,
    source: getSkillSource(character, skill),
    hasProficiency: hasSkillProficiency(character, skill),
    hasExpertise: hasSkillExpertise(character, skill),
    modifier: calculateSkillModifier(character, skill),
    canToggle: !isSkillAutomatic(character, skill),
    canSelectForExpertise: canSelectSkillForExpertise(character, skill),
  }));
};

export const getStudyBuddySummary = (character) => {
  const { studyBuddySkills, expertiseSkills, hasExpertiseGranter } =
    parseSubclassSkills(character);

  if (studyBuddySkills.length === 0 && hasExpertiseGranter.length === 0) {
    return null;
  }

  return {
    studyBuddySkills,
    expertiseSkills,
    hasExpertiseGranter,
    hasStudyBuddy: studyBuddySkills.length > 0,
    hasExpertiseGranterFeature: hasExpertiseGranter.length > 0,
  };
};
