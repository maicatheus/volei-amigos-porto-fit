function generateTeams() {
  const playerList = document.getElementById('playerList').value.trim().split('\n');
  const numTeams = parseInt(document.getElementById('numTeams').value);
  let players = playerList.map(player => {
    const [_ , name, skill] = player.split('-');
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

  const teamContainer = document.getElementById('teamContainer');
  teamContainer.innerHTML = '';

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
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
