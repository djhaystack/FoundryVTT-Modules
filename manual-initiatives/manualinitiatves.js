async function promptInit(){
  let updates = [];
  for( let thisCombatant of game.combat.combatants){

    const content = `<div class="form-group dialog distance-prompt">
      <label>${thisCombatant.name}'s initiative:</label> 
      <input id="init" type="number" name="init" value="" autofocus /></div>`;
    let [newInit] = await new Promise((resolve, reject) => {
    setTimeout(function() {
        new Dialog({
        title: "Manual Init",
        content: content,
        default: 'ok',
        buttons: {
          ok: {
            icon: '<i class="fas fa-check"></i>',
            label: 'Update Initiative',
            default: true,
            callback: html => {
              const newinit = html.find('.distance-prompt.dialog [name="init"]')[0].value;
              resolve([
                  {_id: thisCombatant._id, initiative: newinit}
              ]);
            },
          }
        }
      }).render(true);
      setTimeout(function() { document.getElementById("init").focus(); }, 10);
    },300);
    });
   
    updates.push(newInit);
  }

  console.log(updates);
  game.combat.updateCombatant(updates);
}

promptInit();
