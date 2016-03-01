'use strict';

import RPSGuiModule from './rps-gui';

/**
 *  Main RockPaperScissorsGame module. Contains all logic for a rock paper
 *  scissors game played against the computer. Games are best of 3.
 */
function RockPaperScissorsGame() {
  // Simple object to convert strings to integers for comparisons
  const CHOICE_MAP = {
    rock: 0,
    paper: 1,
    scissors: 2
  };

  // Goal score for a player to win a game.
  const PLAY_TO_SCORE = 2;

  // Rounds (sets of 3 games) won by user and computer.
  let totalScores = {
    user: localStorage.getItem("rps-user-score") || 0,
    comp: localStorage.getItem("rps-comp-score") || 0
  };

  // Matches won by each player in this round.
  let roundScores = {
    user: 0,
    comp: 0
  };

  /**
   *  Determine if a user won or lost a round.
   *
   *  @param rpsChoice {String} - 'rock', 'paper' or 'scissors' depending on user's chosen play
   */
  this.playRound = function(rpsChoice) {
    let userChoice = CHOICE_MAP[rpsChoice];
    let computerChoice = Math.floor((Math.random() * 3));

    // http://stackoverflow.com/questions/11377117/rock-paper-scissors-determine-win-loss-tie-using-math
    let result = '';
    if(userChoice === computerChoice) {
      result = "Tie!";
    }
    else if((userChoice - computerChoice + 3) % 3 === 1) {
      result = "You Win!";
      roundScores.user++;
    }
    else {
      result = "You Lose!";
      roundScores.comp++;
    }
    gui.endRound(result, userChoice, computerChoice);

    endRound();
  };

  /**
   *  End a round. Determine if the game has been won, save the scores to
   *  localStorage, and show the appropriate button to continue.
   */
  function endRound() {

    let newGameRequired = false;
    if(roundScores.user >= PLAY_TO_SCORE) {
      totalScores.user++;
      newGameRequired = true;
    } else if(roundScores.comp >= PLAY_TO_SCORE) {
      totalScores.comp++;
      newGameRequired = true;
    }

    gui.updateScores(totalScores, roundScores);

    localStorage.setItem("rps-user-score", totalScores.user);
    localStorage.setItem("rps-comp-score", totalScores.comp)

    gui.showNextAction(newGameRequired);

  }

  /**
   *  Set up a new game. Reset the round scores to zero, then update the GUI
   *  and display the choices to the user.
   */
  this.newGame = function() {
    roundScores = {user: 0, comp: 0};
    gui.updateScores(totalScores, roundScores);
    gui.startRound();
  }

  let gui = new RPSGuiModule(this);

  this.newGame();
}

// Create the RPSGame object.
(function() {
  new RockPaperScissorsGame();
})();
