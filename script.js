function generateTeams() {
  const teamContainer = document.getElementById('teamContainer');
  teamContainer.innerHTML = '';

  const playerList = document.getElementById('playerList').value.trim();
  const numTeams = parseInt(document.getElementById('numTeams').value);
  
  const invalidLine = validatePlayerList(playerList);

  if (invalidLine.number !== 0) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerText = `Erro: Formato errado \n(${invalidLine.content})\n\n Lembre-se:\n - <nome> - <habilidade>.`;
    return;
  }

  let players = playerList.split('\n').map(player => {
     const [_ , name, skill] = player.split(/\s*-\s*/);
    return { name: name.trim(), skill: parseInt(skill.trim()) };
  });

  players.sort((a, b) => b.skill - a.skill);

  players = shuffleArray(players);

  const teams = Array.from({ length: numTeams }, () => ({ players: [], totalSkill: 0 }));

  players.forEach((player, index) => {
    const teamIndex = index % numTeams;
    teams[teamIndex].players.push(player);
    teams[teamIndex].totalSkill += player.skill;
  });

  teams.forEach((team, index) => {
    const averageSkill = team.totalSkill / team.players.length;
    const teamElement = document.createElement('div');
    teamElement.classList.add('team');
    teamElement.innerHTML = `<h2>Time ${index + 1} - Habilidade Média: ${averageSkill.toFixed(2)}</h2>`;
    team.players.forEach(player => {
      teamElement.innerHTML += `<p>${player.name}</p>`;
    });
    teamContainer.appendChild(teamElement);
  });

  const errorDiv = document.getElementById('error');
  errorDiv.innerText = '';
}

function validatePlayerList(playerList) {
  const lines = playerList.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) {
      return { number: i + 1, content: '' }; 
    }

    if (!/^-.*\s*-\s*\d+$/.test(line)) {
      return { number: i + 1, content: line };
    }
  }
  return { number: 0, content: '' }; 
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
