import TYPES from '~/services/types';

export default function() {
  const hand = [
    {
      id: 3,
      name: 'Spend 1 Energy to gain 5 steel (repeatable)',
      cost: 5,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 1,
          resource: TYPES.RESOURCE_ENERGY
        },
        {
          type: TYPES.SPEND,
          amount: 5,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.GAIN,
          amount: 5,
          resource: TYPES.RESOURCE_STEEL
        }
      ]
    },
    {
      id: 5,
      name: 'Increase Temperature (repeatable)',
      cost: 8,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 8,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.INCREASE_CONDITION,
          amount: 1,
          condition: TYPES.CONDITION_TEMPERATURE
        }
      ]
    },
    {
      id: 6,
      name: 'Gain 2 Plants',
      cost: 15,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 15,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.GAIN,
          amount: 2,
          resource: TYPES.RESOURCE_PLANTS
        },
        {
          type: TYPES.PLACE_IN_DISCARD
        }
      ]
    },
    {
      id: 7,
      name: 'Spend 1 Energy to create 1 Titanium (repeatable)',
      cost: 2,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 2,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.SPEND,
          amount: 1,
          resource: TYPES.RESOURCE_ENERGY
        },
        {
          type: TYPES.GAIN,
          amount: 1,
          resource: TYPES.RESOURCE_TITANIUM
        }
      ]
    }
  ];
  
  let board = [];
  let i = 0;
  while (board.length < 3) {
    i++;
    board.push({
      name: `Biodome Lvl ${i}`,
      id: `board-${i}`,
      text: `Spend ${10*i} steel and ${3*i} plants to increase oxygen ${i} step`,
      afterBuildText: `Oxygen Raised ${i} steps`,
      placed: false,
      buildable: true,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 10*i,
          resource: TYPES.RESOURCE_STEEL
        },
        {
          type: TYPES.SPEND,
          amount: 3*i,
          resource: TYPES.RESOURCE_PLANTS
        },
        {
          type: TYPES.INCREASE_CONDITION,
          amount: i,
          condition: TYPES.CONDITION_OXYGEN
        },
        {
          type: TYPES.FLAG_SELF_PLACED
        }
      ]
    })
  }
  while (board.length < 5) {
    i++;
    board.push({
      name: `Super Heat Driller`,
      id: `board-heat-${i}`,
      text: 'Spend 10 steel and 5 titanium to build a drill that increases the temperature 2 steps every year',
      afterBuildText: 'Increases the Temperature 2 steps every year.',
      placed: false,
      buildable: true,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 10,
          resource: TYPES.RESOURCE_STEEL
        },
        {
          type: TYPES.SPEND,
          amount: 5,
          resource: TYPES.RESOURCE_TITANIUM
        },
        {
          type: TYPES.ADD_YEARLY_ACTIONS,
          actions: [
            {
              type: TYPES.INCREASE_CONDITION,
              amount: 2,
              condition: TYPES.CONDITION_TEMPERATURE
            }
          ]
        },
        {
          type: TYPES.FLAG_SELF_PLACED
        }
      ]
    })
  }
  while (board.length < 7) {
    i++;
    board.push({
      name: `Forest`,
      id: `board-forest${i}`,
      text: 'Spend $25 to build a forest that adds 2 to plant production',
      placed: false,
      buildable: true,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 25,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.GAIN_PRODUCTION,
          amount: 2,
          resource: TYPES.RESOURCE_PLANTS
        },
        {
          type: TYPES.FLAG_SELF_PLACED
        }
      ]
    })
  }
  while (board.length < 9) {
    i++;
    board.push({
      name: `City`,
      id: `board-city${i}`,
      text: 'Spend $20 and 3 Titanium to build a city that grants 5 megacredit production and 2 energy production',
      placed: false,
      buildable: true,
      actions: [
        {
          type: TYPES.SPEND,
          amount: 20,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.SPEND,
          amount: 3,
          resource: TYPES.RESOURCE_TITANIUM
        },
        {
          type: TYPES.GAIN_PRODUCTION,
          amount: 5,
          resource: TYPES.RESOURCE_MEGACREDIT
        },
        {
          type: TYPES.GAIN_PRODUCTION,
          amount: 2,
          resource: TYPES.RESOURCE_ENERGY
        },
        {
          type: TYPES.FLAG_SELF_PLACED
        }
      ]
    })
  }
  // while (board.length < 9) {
  //   i++;
  //   board.push({
  //     name: `Empty ${i}`,
  //     id: `board-empty-${i}`,
  //     buildable: false,
  //     actions: []
  //   })
  // }

  return {
    board,
    hand,
    turnLimit: 15,
    conditions: {
      [TYPES.CONDITION_TEMPERATURE]: 0,
      [TYPES.CONDITION_OXYGEN]: 0
    },
    winConditions: {
      [TYPES.CONDITION_TEMPERATURE]: 30,
      [TYPES.CONDITION_OXYGEN]: 6
    },
    yearlyActions: [],
    production: {
      [TYPES.RESOURCE_MEGACREDIT]: 10,
      [TYPES.RESOURCE_STEEL]: 0,
      [TYPES.RESOURCE_TITANIUM]: 0,
      [TYPES.RESOURCE_PLANTS]: 0,
      [TYPES.RESOURCE_ENERGY]: 2
    },
    resources: {
      [TYPES.RESOURCE_MEGACREDIT]: 15,
      [TYPES.RESOURCE_STEEL]: 0,
      [TYPES.RESOURCE_TITANIUM]: 0,
      [TYPES.RESOURCE_PLANTS]: 0,
      [TYPES.RESOURCE_ENERGY]: 2
    },
  }
}
