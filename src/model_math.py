from dataclasses import dataclass
@dataclass
class MathInputs:
    MDD: int = 9028000
    TRD: int = MDD * .3
    manic_P: float = 19
    suicide_P: float = 8
    diabetes_P: float = 2.9
    stroke_P: float = 1.9
    heart_attack_P: float = 2.7
    blood_pressure_P:float = 2
    epilepsy_P:float = 3.7
    personality_P:float = 2.2
    hepatic_P:float = 1.8
    psycological_P:float = 23.2
    health_P:float = 8
    comorbid_hepatic_P:float = 1

def model_math(inputs: MathInputs):
    trial_MDD = inputs.MDD * .24
    trial_TRD = inputs.TRD * .24
    real_P = inputs.manic_P + inputs.suicide_P + inputs.diabetes_P + inputs.stroke_P + inputs.heart_attack_P + inputs.blood_pressure_P + inputs.epilepsy_P + inputs.personality_P + inputs.hepatic_P
    # print(real_P)
    comorbid_p = inputs.psycological_P + inputs.health_P + inputs.epilepsy_P + inputs.personality_P + inputs.comorbid_hepatic_P
    # print(comorbid_p)
    real_MDD = inputs.MDD * (1-(real_P/100))
    real_TRD = inputs.TRD * (1-(real_P/100))
    comorbid_MDD = inputs.MDD * (1-(comorbid_p/100))
    comorbid_TRD = inputs.TRD * (1-(comorbid_p/100))

    return {"trial": (trial_MDD, trial_TRD), "real":(real_MDD, real_TRD), "comorbid":(comorbid_MDD, comorbid_TRD)}

if __name__ == "__main__":
    sample_inputs = MathInputs()
    print(model_math(sample_inputs))