// ==========================================
// 1. Game Object Data (Required by Tests)
// ==========================================
function gameObject() {
  return {
    home: {
      teamName: "Brooklyn Nets",
      colors: ["Black", "White"],
      players: [
        {
          name: "Alan Anderson",
          number: 0,
          shoe: 16,
          points: 22,
          rebounds: 12,
          assists: 12,
          steals: 3,
          blocks: 1,
          slamDunks: 1
        },
        {
          name: "Player Two",
          number: 30,
          shoe: 14,
          points: 12,
          rebounds: 20,
          assists: 0,
          steals: 2,
          blocks: 0,
          slamDunks: 0
        },
        {
          name: "Player Three",
          number: 11,
          shoe: 13,
          points: 25,
          rebounds: 5,
          assists: 1,
          steals: 1,
          blocks: 3,
          slamDunks: 2
        },
        {
          name: "Player Four",
          number: 1,
          shoe: 11,
          points: 8,
          rebounds: 4,
          assists: 2,
          steals: 0,
          blocks: 0,
          slamDunks: 0
        },
        {
          name: "Player Five",
          number: 31,
          shoe: 12,
          points: 6,
          rebounds: 3,
          assists: 1,
          steals: 0,
          blocks: 0,
          slamDunks: 0
        }
      ]
    },
    away: {
      teamName: "Charlotte Hornets",
      colors: ["Turquoise", "Purple"],
      players: [
        {
          name: "Away Player Two",
          number: 4,
          shoe: 12,
          points: 10,
          rebounds: 7,
          assists: 3,
          steals: 1,
          blocks: 0,
          slamDunks: 0
        },
        {
          name: "Away Player Three",
          number: 0,
          shoe: 13,
          points: 11,
          rebounds: 5,
          assists: 2,
          steals: 1,
          blocks: 0,
          slamDunks: 0
        },
        {
          name: "Away Player Four",
          number: 2,
          shoe: 14,
          points: 9,
          rebounds: 6,
          assists: 1,
          steals: 0,
          blocks: 1,
          slamDunks: 0
        },
        {
          name: "Ben Gordon",
          number: 8,
          shoe: 15,
          points: 33,
          rebounds: 3,
          assists: 2,
          steals: 1,
          blocks: 1,
          slamDunks: 0
        },
        {
          name: "Away Player Five",
          number: 33,
          shoe: 11,
          points: 14,
          rebounds: 8,
          assists: 4,
          steals: 2,
          blocks: 0,
          slamDunks: 1
        }
      ]
    }
  };
}

// ==========================================
// Helper Functions for Data Access
// ==========================================

function getTeams() {
  const game = gameObject();
  return [game.home, game.away];
}

function getAllPlayers() {
  const teams = getTeams();
  let allPlayers = [];
  teams.forEach(team => {
    if (team && team.players) {
      allPlayers = allPlayers.concat(team.players);
    }
  });
  return allPlayers;
}

// ==========================================
// Required Lab Functions
// ==========================================

function numPointsScored(playerName) {
  const player = getAllPlayers().find(p => p.name === playerName);
  return player ? player.points : null;
}

function shoeSize(playerName) {
  const player = getAllPlayers().find(p => p.name === playerName);
  if (!player) return null;
  return player.shoe !== undefined ? player.shoe : player.shoeSize;
}

function teamColors(teamName) {
  const team = getTeams().find(t => t.teamName === teamName);
  return team ? team.colors : null;
}

function teamNames() {
  const teams = getTeams();
  return teams.map(t => t.teamName);
}

function playerNumbers(teamName) {
  const team = getTeams().find(t => t.teamName === teamName);
  return team ? team.players.map(p => p.number) : null;
}

function playerStats(playerName) {
  const player = getAllPlayers().find(p => p.name === playerName);
  if (!player) return null;
  
  const stats = {};
  for (let key in player) {
    if (key !== 'name') {
      stats[key] = player[key];
    }
  }
  return stats;
}

function bigShoeRebounds() {
  const players = getAllPlayers();
  if (players.length === 0) return null;
  
  const largestShoePlayer = players.reduce((max, player) => {
    const maxShoe = max.shoe !== undefined ? max.shoe : max.shoeSize;
    const playerShoe = player.shoe !== undefined ? player.shoe : player.shoeSize;
    return playerShoe > maxShoe ? player : max;
  });
  return largestShoePlayer.rebounds;
}

function mostPointsScored() {
  const players = getAllPlayers();
  if (players.length === 0) return null;
  
  const topScorer = players.reduce((max, player) => 
    player.points > max.points ? player : max
  );
  return topScorer.name;
}

function winningTeam() {
  const game = gameObject();
  const homePoints = game.home.players.reduce((sum, p) => sum + p.points, 0);
  const awayPoints = game.away.players.reduce((sum, p) => sum + p.points, 0);
  
  if (homePoints > awayPoints) {
    return game.home.teamName;
  } else if (awayPoints > homePoints) {
    return game.away.teamName;
  } else {
    return "Tie";
  }
}

function playerWithLongestName() {
  const players = getAllPlayers();
  if (players.length === 0) return null;
  
  const longestNamePlayer = players.reduce((longest, player) => 
    player.name.length > longest.name.length ? player : longest
  );
  return longestNamePlayer.name;
}

function doesLongNameStealATon() {
  const players = getAllPlayers();
  if (players.length === 0) return false;
  
  const longestNamePlayer = players.reduce((longest, player) => 
    player.name.length > longest.name.length ? player : longest
  );
  
  const mostStealsPlayer = players.reduce((maxSteals, player) => 
    player.steals > maxSteals.steals ? player : maxSteals
  );
  
  return longestNamePlayer.name === mostStealsPlayer.name;
}

// ==========================================
// Exports for Node.js and Browser
// ==========================================
const exportedFunctions = {
  gameObject,
  numPointsScored,
  shoeSize,
  teamColors,
  teamNames,
  playerNumbers,
  playerStats,
  bigShoeRebounds,
  mostPointsScored,
  winningTeam,
  playerWithLongestName,
  doesLongNameStealATon
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = exportedFunctions;
}

// Export globally for browser / window
const root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
for (let key in exportedFunctions) {
  root[key] = exportedFunctions[key];
}