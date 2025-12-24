// ===== AGENT STATE =====
const agentState = {
  bust: null,
  length: null,
  shoulder: null,
  sleeve: null,
  step: "bust"
};

const agentMessage = document.getElementById("agentMessage");
const resultBox = document.getElementById("result");

// Initial agent message
agentMessage.innerText = "Normal blouse stitch panna bust measurement sollunga (inches)";

// ===== USER INPUT HANDLER =====
function handleUserInput() {
  const value = Number(document.getElementById("userInput").value);
  document.getElementById("userInput").value = "";

  if (!value || value <= 0) {
    agentMessage.innerText = "சரியான அளவை உள்ளிடவும்";
    return;
  }

  agentThink(value);
}

// ===== AGENT DECISION LOGIC =====
function agentThink(value) {
  if (agentState.step === "bust") {
    agentState.bust = value;
    agentState.step = "length";
    agentMessage.innerText = "Blouse length சொல்லுங்க (inches)";
  }
  else if (agentState.step === "length") {
    agentState.length = value;
    agentState.step = "shoulder";
    agentMessage.innerText = "Shoulder width சொல்லுங்க (inches)";
  }
  else if (agentState.step === "shoulder") {
    agentState.shoulder = value;
    agentState.step = "sleeve";
    agentMessage.innerText = "Sleeve length சொல்லுங்க (inches)";
  }
  else if (agentState.step === "sleeve") {
    agentState.sleeve = value;
    agentState.step = "done";
    agentMessage.innerText = "Cutting plan தயார் செய்யப்படுகிறது...";
    generateCuttingPlan();
  }
}

// ===== CUTTING CALCULATION =====
function calculateBlouse(state) {
  return {
    frontWidth: (state.bust / 4 + 1).toFixed(1),
    backWidth: (state.bust / 4 + 1).toFixed(1),
    length: state.length,
    neckFront: 6.5,
    neckBack: 2.5,
    sleeveLength: state.sleeve,
    sleeveWidth: (state.bust / 6 + 0.5).toFixed(1),
    shoulder: state.shoulder
  };
}

// ===== OUTPUT GENERATION =====
function generateCuttingPlan() {
  const m = calculateBlouse(agentState);

  resultBox.innerText = `
✂️ BLOUSE CUTTING PLAN (AI AGENT)

முன் பகுதி:
- அகலம்: ${m.frontWidth} inch
- நீளம்: ${m.length} inch
- Neck depth: ${m.neckFront} inch

பின் பகுதி:
- அகலம்: ${m.backWidth} inch
- Neck depth: ${m.neckBack} inch

Sleeve:
- நீளம்: ${m.sleeveLength} inch
- அகலம்: ${m.sleeveWidth} inch

Shoulder:
- அகலம்: ${m.shoulder} inch

📌 Paper-la measure mark pannitu cut pannunga.
Ellaa part-um ready aana apram stitch pannunga.
`;

  agentMessage.innerText = "AI agent task complete ✅";
}
