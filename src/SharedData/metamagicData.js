export const METAMAGIC_OPTIONS = {
  // Core Metamagic Options (Available to all casting styles)
  "Careful Spell": {
    name: "Careful Spell",
    cost: 1,
    description:
      "When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell's full force. To do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell.",
    availableFor: ["all"],
    type: "core",
  },
  "Distant Spell": {
    name: "Distant Spell",
    cost: 1,
    description:
      "When you cast a spell that has a range of 5 feet or greater, you can spend 1 sorcery point to double the range of the spell. When you cast a spell that has a range of touch, you can spend 1 sorcery point to make the range of the spell 30 feet.",
    availableFor: ["all"],
    type: "core",
  },
  "Empowered Spell": {
    name: "Empowered Spell",
    cost: 1,
    description:
      "When you roll damage for a spell, you can spend 1 sorcery point to reroll a number of the damage dice up to your spellcasting ability modifier (minimum of one). You must use the new rolls. You can use Empowered Spell even if you have already used a different Metamagic option during the casting of the spell.",
    availableFor: ["all"],
    type: "core",
  },
  "Extended Spell": {
    name: "Extended Spell",
    cost: 1,
    description:
      "When you cast a spell that has a duration of 1 minute or longer, you can spend 1 sorcery point to double its duration, to a maximum duration of 24 hours.",
    availableFor: ["all"],
    type: "core",
  },
  "Heightened Spell": {
    name: "Heightened Spell",
    cost: 3,
    description:
      "When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.",
    availableFor: ["all"],
    type: "core",
  },
  "Quickened Spell": {
    name: "Quickened Spell",
    cost: 2,
    description:
      "When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.",
    availableFor: ["all"],
    type: "core",
  },
  "Subtle Spell": {
    name: "Subtle Spell",
    cost: 1,
    description:
      "When you cast a spell, you can spend 1 sorcery point to cast it without any somatic or verbal components.",
    availableFor: ["all"],
    type: "core",
  },
  "Twinned Spell": {
    name: "Twinned Spell",
    cost: "spell_level",
    description:
      "When you cast a spell that targets only one creature and doesn't have a range of self, you can spend a number of sorcery points equal to the spell's level to target a second creature in range with the same spell (1 sorcery point if the spell is a cantrip).",
    availableFor: ["all"],
    type: "core",
  },

  // Willpower-specific Metamagic Options
  "Fierce Spell": {
    name: "Fierce Spell",
    cost: "2_or_4",
    description:
      "When you cast a spell, you can spend 2 sorcery points to cast that spell as if it were cast using a spell slot one level higher than its original level, or 4 sorcery points to cast that spell two levels higher. The spell's higher level cannot exceed your highest available level of spell slots. This does not count against your number of Metamagic options.",
    availableFor: ["Willpower"],
    type: "class_specific",
    automatic: true,
  },
  "Resistant Spell": {
    name: "Resistant Spell",
    cost: "per_level",
    description:
      "When you cast a spell, you can spend 1 sorcery point per increased level to make your spell be treated by spell deflection, finite incantatem, reparifarge, or langlock as if your spell was cast using a spell slot higher than its original level, making your spell more resistant. The spell's higher level cannot exceed your highest available level of spell slots. This does not count against your number of Metamagic options.",
    availableFor: ["Willpower"],
    type: "class_specific",
    automatic: true,
  },

  // Technique-specific Metamagic Options
  "Bouncing Spell": {
    name: "Bouncing Spell",
    cost: 2,
    description:
      "When a creature succeeds at a saving throw against a single-target spell you cast, you can spend 2 Sorcery Points to have the spell bounce, targeting another creature of your choice within 30 ft. of the original target without spending another spell slot or taking an additional action.",
    availableFor: ["Technique"],
    type: "class_specific",
  },
  "Maximized Spell": {
    name: "Maximized Spell",
    cost: "double_spell_level",
    description:
      "When you roll damage for a leveled spell, you can spend a number of Sorcery Points equal to twice the spell's level to deal maximum damage to one target of the spell. Maximized spell can not be applied to Exploit Weakness damage.",
    availableFor: ["Technique"],
    type: "class_specific",
  },
  "Seeking Spell": {
    name: "Seeking Spell",
    cost: 2,
    description:
      "If you make an attack roll for a spell and miss, you can spend 2 Sorcery Points to reroll the d20, and you must use the new roll. You can use Seeking Spell even if you have already used a different Metamagic option during the casting of the spell.",
    availableFor: ["Technique"],
    type: "class_specific",
  },

  // Vigor-specific Metamagic Options
  Rage: {
    name: "Rage",
    cost: 5,
    description:
      "When in battle, you fight with primal ferocity. On your turn, you can spend 5 sorcery points to enter a rage as a bonus action. While raging, you gain advantage on Strength checks and Strength saving throws, resistance to bludgeoning, piercing, slashing and fire damage, but you can't cast spells with an area of effect (cube, line, sphere, or cone) or concentrate or dedicate on spells while raging.",
    availableFor: ["Vigor"],
    type: "class_specific",
    automatic: true,
  },

  // Special Metamagic Options from Feats/Features
  "Converted Spell": {
    name: "Converted Spell",
    cost: 1,
    description:
      "You can spend 1 sorcery point to change the spell's damage type. You can use Converted Spell even if you have already used a different Metamagic option during the spell's casting.",
    availableFor: ["feat"],
    type: "special",
  },
  "Controlled Spell": {
    name: "Controlled Spell",
    cost: 2,
    description:
      "You can spend 2 sorcery points to change a spell's area of effect to one of the following: 10 foot radius sphere, 15 foot cone, 20 Foot Straight line, or increase the spell's area of effect by 5 feet (Spells that specify fitting within a X foot cube don't apply).",
    availableFor: ["feat"],
    type: "special",
  },
  "Triggered Spell": {
    name: "Triggered Spell",
    cost: 3,
    description:
      "When you cast a spell on a target you can spend 3 sorcery points to delay the spell's effects. Upon casting, set a trigger for the spell to take effect. When the conditions are met, the spell will activate and act as normal. If the spell is not triggered within 24 hours, nothing happens and the spell is wasted. Additionally, the spell gains either the Arithmantic or Runic tag.",
    availableFor: ["feat"],
    type: "special",
  },
  "Continued Spell": {
    name: "Continued Spell",
    cost: "double_spell_level_min_1",
    description:
      "You can spend a number of sorcery points equal to double the spell's level (Minimum of one Sorcery Point) to reduce a Dedication spell to Concentration or reduce a Concentration spell to Instantaneous.",
    availableFor: ["feat"],
    type: "special",
  },
  "Empowered Healing": {
    name: "Empowered Healing",
    cost: "up_to_proficiency",
    description:
      "When you cast a spell that restores hit points, you may spend a number of sorcery points up to your proficiency bonus. For each sorcery point spent in this way, maximize the amount healed per die involved. Ex: Two sorcery points on Episkey = 8 + spellcasting modifier hp restored.",
    availableFor: ["feat"],
    type: "special",
  },
  "Surging Spell": {
    name: "Surging Spell",
    cost: "up_to_proficiency",
    description:
      "Once per round, when you cast a spell that deals damage to two or fewer targets, you may expend a number of sorcery points up to your proficiency bonus. For each sorcery point spent in this way, add 1d6 damage to your total. You may choose the damage type from psychic, force, acid, cold, fire, lightning, thunder, or necrotic. You can use Surging Spell even if you have already used a different Metamagic option during the casting of the spell. You must choose to use this metamagic before seeing the result of the spell attack or saving throw roll.",
    availableFor: ["feat"],
    type: "special",
  },
};

// Sorcery Points progression by level (follows 5e Sorcerer table)
export const SORCERY_POINTS_BY_LEVEL = {
  1: 0,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
};

// Metamagic options gained by level
export const METAMAGIC_PROGRESSION = {
  3: 2, // Gain 2 metamagic options at 3rd level
  10: 1, // Gain 1 additional option at 10th level (total 3)
  17: 1, // Gain 1 additional option at 17th level (total 4)
};

// Helper function to get available metamagic options for a casting style
export const getAvailableMetamagicOptions = (castingStyle, level = 1) => {
  const options = [];

  // Add core options available to all
  Object.entries(METAMAGIC_OPTIONS).forEach(([key, option]) => {
    if (option.availableFor.includes("all")) {
      options.push({ key, ...option });
    }
  });

  // Add class-specific options
  Object.entries(METAMAGIC_OPTIONS).forEach(([key, option]) => {
    if (option.availableFor.includes(castingStyle)) {
      options.push({ key, ...option });
    }
  });

  return options;
};

// Helper function to calculate total metamagic options available at a level
export const getTotalMetamagicOptionsAtLevel = (level) => {
  let total = 0;
  Object.entries(METAMAGIC_PROGRESSION).forEach(([levelReq, count]) => {
    if (level >= parseInt(levelReq)) {
      total += count;
    }
  });
  return total;
};

// Helper function to calculate current sorcery points
export const getCurrentSorceryPoints = (
  level,
  castingStyle,
  featBenefits = null
) => {
  let basePoints = SORCERY_POINTS_BY_LEVEL[level] || 0;

  // Add sorcery points from feats
  if (featBenefits?.spellcasting?.sorceryPoints) {
    basePoints += featBenefits.spellcasting.sorceryPoints;
  }

  return basePoints;
};
