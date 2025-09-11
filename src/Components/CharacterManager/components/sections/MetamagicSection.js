import { useState } from "react";
import { Sparkles, Info, Plus, X, Zap } from "lucide-react";
import FormSection from "../FormSection";
import Field from "../Field";
import {
  METAMAGIC_OPTIONS,
  getAvailableMetamagicOptions,
  getTotalMetamagicOptionsAtLevel,
  getCurrentSorceryPoints,
  SORCERY_POINTS_BY_LEVEL,
} from "../../../../SharedData/metamagicData";
import { calculateFeatBenefits } from "../../utils/featBenefitsCalculator";

const MetamagicSection = ({
  character,
  onUpdate,
  mode,
  theme,
  styles,
  locked = false,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showInfo, setShowInfo] = useState({});

  const castingStyle = character?.castingStyle || "";
  const level = character?.level || 1;
  const featBenefits = calculateFeatBenefits(character);

  const hasMetamagicAccess = level >= 3;
  const hasFontOfMagic = level >= 2;

  const totalOptionsAllowed = getTotalMetamagicOptionsAtLevel(level);
  const currentChoices = character?.metamagicChoices || {};
  const currentOptions = Object.keys(currentChoices);

  const availableOptions = getAvailableMetamagicOptions(castingStyle, level);

  const selectableOptions = availableOptions.filter(
    (option) => !currentOptions.includes(option.key) && !option.automatic
  );

  const maxSorceryPoints = getCurrentSorceryPoints(
    level,
    castingStyle,
    featBenefits
  );
  const currentSorceryPoints =
    character?.sorceryPoints?.current ?? maxSorceryPoints;

  const handleAddMetamagic = () => {
    if (!selectedOption || currentOptions.length >= totalOptionsAllowed) return;

    const newChoices = { ...currentChoices, [selectedOption]: true };
    onUpdate({
      metamagicChoices: newChoices,
    });
    setSelectedOption("");
  };

  const handleRemoveMetamagic = (optionKey) => {
    const newChoices = { ...currentChoices };
    delete newChoices[optionKey];

    onUpdate({
      metamagicChoices: newChoices,
    });
  };

  const handleSorceryPointsChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    const newSorceryPoints = { ...character.sorceryPoints };
    newSorceryPoints[field] = Math.max(0, Math.min(numValue, maxSorceryPoints));

    onUpdate({
      sorceryPoints: newSorceryPoints,
    });
  };

  const toggleInfo = (optionKey) => {
    setShowInfo((prev) => ({
      ...prev,
      [optionKey]: !prev[optionKey],
    }));
  };

  const formatCost = (cost) => {
    switch (cost) {
      case "spell_level":
        return "Spell Level (1 for cantrip)";
      case "2_or_4":
        return "2 or 4 SP";
      case "double_spell_level":
        return "2× Spell Level";
      case "per_level":
        return "1 SP per level increase";
      case "double_spell_level_min_1":
        return "2× Spell Level (min 1)";
      case "up_to_proficiency":
        return "Up to Proficiency Bonus";
      default:
        return `${cost} SP`;
    }
  };

  if (!castingStyle) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: theme.textSecondary,
          fontStyle: "italic",
        }}
      >
        Select a casting style to view metamagic options
      </div>
    );
  }

  return (
    <div>
      {/* Font of Magic Section */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <Zap size={18} color={theme.primary} />
          <h4
            style={{
              margin: 0,
              color: theme.text,
              fontSize: "16px",
            }}
          >
            Font of Magic{" "}
            {level >= 2 ? `(Level ${level})` : "(Unlocked at Level 2)"}
          </h4>
        </div>

        {hasFontOfMagic ? (
          <div
            style={{
              padding: "16px",
              backgroundColor: theme.surface,
              borderRadius: "8px",
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "12px",
              }}
            >
              <Field
                label="Current Sorcery Points"
                value={currentSorceryPoints}
                onChange={(value) =>
                  handleSorceryPointsChange("current", value)
                }
                type="number"
                min="0"
                max={maxSorceryPoints}
                theme={theme}
                disabled={locked || mode === "view"}
              />
              <Field
                label="Maximum Sorcery Points"
                value={maxSorceryPoints}
                theme={theme}
                disabled={true}
                helpText={`Based on level ${level} + feat bonuses`}
              />
            </div>

            <div
              style={{
                fontSize: "14px",
                color: theme.textSecondary,
                lineHeight: "1.4",
              }}
            >
              <strong>Flexible Casting:</strong> You can convert sorcery points
              to spell slots or spell slots to sorcery points as a bonus action.
              You regain all sorcery points on a short rest.
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "16px",
              backgroundColor: theme.surface + "50",
              borderRadius: "8px",
              border: `1px dashed ${theme.border}`,
              color: theme.textSecondary,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Font of Magic unlocks at 2nd level
          </div>
        )}
      </div>

      {/* Metamagic Section */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <Sparkles size={18} color={theme.primary} />
          <h4
            style={{
              margin: 0,
              color: theme.text,
              fontSize: "16px",
            }}
          >
            Metamagic Options{" "}
            {hasMetamagicAccess
              ? `(${currentOptions.length}/${totalOptionsAllowed})`
              : "(Unlocked at Level 3)"}
          </h4>
        </div>

        {hasMetamagicAccess ? (
          <>
            {/* Current Metamagic Options */}
            {currentOptions.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                {currentOptions.map((optionKey) => {
                  const option = METAMAGIC_OPTIONS[optionKey];
                  if (!option) return null;

                  return (
                    <div
                      key={optionKey}
                      style={{
                        padding: "12px",
                        backgroundColor: theme.surface,
                        borderRadius: "8px",
                        border: `1px solid ${theme.border}`,
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "4px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <strong style={{ color: theme.text }}>
                            {option.name}
                          </strong>
                          <span
                            style={{
                              fontSize: "12px",
                              color: theme.primary,
                              backgroundColor: theme.primary + "20",
                              padding: "2px 6px",
                              borderRadius: "4px",
                            }}
                          >
                            Cost: {formatCost(option.cost)}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <button
                            onClick={() => toggleInfo(optionKey)}
                            style={{
                              background: "none",
                              border: "none",
                              color: theme.textSecondary,
                              cursor: "pointer",
                              padding: "4px",
                            }}
                          >
                            <Info size={16} />
                          </button>
                          {!locked && mode !== "view" && !option.automatic && (
                            <button
                              onClick={() => handleRemoveMetamagic(optionKey)}
                              style={{
                                background: "none",
                                border: "none",
                                color: theme.error,
                                cursor: "pointer",
                                padding: "4px",
                              }}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                      {showInfo[optionKey] && (
                        <div
                          style={{
                            fontSize: "13px",
                            color: theme.textSecondary,
                            lineHeight: "1.4",
                            marginTop: "8px",
                            padding: "8px",
                            backgroundColor: theme.background,
                            borderRadius: "4px",
                          }}
                        >
                          {option.description}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add New Metamagic Option */}
            {!locked &&
              mode !== "view" &&
              currentOptions.length < totalOptionsAllowed &&
              selectableOptions.length > 0 && (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: theme.surface,
                    borderRadius: "8px",
                    border: `1px dashed ${theme.border}`,
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.text,
                        marginBottom: "8px",
                      }}
                    >
                      Add Metamagic Option:
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <select
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        style={{
                          flex: 1,
                          padding: "8px",
                          border: `1px solid ${theme.border}`,
                          borderRadius: "4px",
                          backgroundColor: theme.background,
                          color: theme.text,
                        }}
                      >
                        <option value="">Select a metamagic option...</option>
                        {selectableOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.name} - Cost: {formatCost(option.cost)}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddMetamagic}
                        disabled={!selectedOption}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: selectedOption
                            ? theme.primary
                            : theme.textSecondary,
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: selectedOption ? "pointer" : "not-allowed",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Plus size={16} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

            {/* Automatic Metamagic Options */}
            {(() => {
              const automaticOptions = availableOptions.filter(
                (option) => option.automatic
              );
              if (automaticOptions.length === 0) return null;

              return (
                <div style={{ marginTop: "16px" }}>
                  <h5
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "14px",
                      color: theme.textSecondary,
                    }}
                  >
                    Automatic Class Features:
                  </h5>
                  {automaticOptions.map((option) => (
                    <div
                      key={option.key}
                      style={{
                        padding: "8px",
                        backgroundColor: theme.primary + "10",
                        borderRadius: "4px",
                        border: `1px solid ${theme.primary}40`,
                        fontSize: "13px",
                        marginBottom: "4px",
                      }}
                    >
                      <strong>{option.name}</strong> - {formatCost(option.cost)}
                    </div>
                  ))}
                </div>
              );
            })()}

            {currentOptions.length === 0 && selectableOptions.length === 0 && (
              <div
                style={{
                  padding: "16px",
                  textAlign: "center",
                  color: theme.textSecondary,
                  fontStyle: "italic",
                }}
              >
                No metamagic options available for {castingStyle} at this level
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              padding: "16px",
              backgroundColor: theme.surface + "50",
              borderRadius: "8px",
              border: `1px dashed ${theme.border}`,
              color: theme.textSecondary,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Metamagic unlocks at 3rd level ({castingStyle} gains{" "}
            {getTotalMetamagicOptionsAtLevel(3)} options)
          </div>
        )}
      </div>
    </div>
  );
};

export default MetamagicSection;
