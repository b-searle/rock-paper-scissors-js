/**
 *  Module to handle GUI updates from RockPaperScissorsGame. Ideally this could be
 *  replaced with a console version or different UI if desired.
 *
 *  @param gameLogic {RockPaperScissorsGame} - Game logic object containing functions for RPS game logic
 */
export default function RPSGuiModule(gameLogic) {
  let choices = document.querySelector('.choices');
  let playArea = document.querySelector('.play-area');
  let userChoice = playArea.querySelector('.user-choice');
  let compChoice = playArea.querySelector('.comp-choice');
  let resultLabel = playArea.querySelector('.result');

  let totalScorePane = document.querySelector('.score');
  let roundScorePane = document.querySelector('.round-score');

  let restartButton = document.querySelector('.restart');
  let newGameButton = document.querySelector('.new-game');

  // Helper function to toggle class "hidden" on two elements. Helpful for
  // moving from one state to another.
  function toggleElementVisibility(toHide, toShow) {
    toHide.classList.add('hidden');
    toShow.classList.remove('hidden');
  }

  // Format a string to print scores prefaced with You and Computer to signify which is which.
  function printScores(scoreObj) {
    return `You: ${scoreObj.user} - Computer: ${scoreObj.comp}`;
  }

  function playRound(event) {
    gameLogic.playRound(event.target.getAttribute('name'));
  }

  // Convert integer value for a choice to the appropriate emoji classes from
  // Twemoji-awesome.
  function convertToEmoji(playedValue) {
    switch(playedValue) {
      case 0: return 'twa-fist';
      case 1: return 'twa-hand';
      case 2: return 'twa-v';
      default: return '';
    }
  }

  this.startRound = function() {
    document.querySelector('.user-choice').className = 'user-choice twa';
    document.querySelector('.comp-choice').className = 'comp-choice twa';
    toggleElementVisibility(playArea, choices);
  }

  this.endRound = function(resultText, userPlayed, computerPlayed) {
    toggleElementVisibility(choices, playArea);

    let userEmoji = convertToEmoji(userPlayed);
    let compEmoji = convertToEmoji(computerPlayed);

    userChoice.classList.add(userEmoji);
    compChoice.classList.add(compEmoji);
    resultLabel.innerHTML = resultText;
  }

  this.showNextAction = function(newGameRequired) {
    if(newGameRequired) {
      toggleElementVisibility(restartButton, newGameButton);
    } else {
      toggleElementVisibility(newGameButton, restartButton);
    }
  }

  this.updateScores = function(totalScores = {user: 0, comp: 0}, roundScores = {user: 0, comp: 0}) {
    totalScorePane.innerHTML = printScores(totalScores);
    roundScorePane.innerHTML = printScores(roundScores);
  }

  // Wire up events to buttons
  let choiceButtons = choices.querySelectorAll('button');
  for (let i=0; i<choiceButtons.length; i++) {
    choiceButtons[i].addEventListener("click", playRound);
  }
  document.querySelector('.restart').addEventListener('click', this.startRound);
  document.querySelector('.new-game').addEventListener('click', gameLogic.newGame);
}
