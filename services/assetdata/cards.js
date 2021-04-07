import TYPES from '~/services/types';

export default [
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
]
