const manifest = {
  stages: {
    stage_number: 1,

    data: [
      {
        value: 'adsf'
      }
    ]
  }
};

const procedures = {
  stages: [
    {
      stage_number: 1,
      stage_title: 'Stage 1: Driver',
      questions: [
        {
          type: 'checkbox',
          question_label: "Inspect driver's credentials",
          description: ''
        }
      ]
    },
    {
      stage_number: 2,
      stage_title: 'Stage 2: Qualifications',
      questions: [
        {
          type: 'checkbox',
          question_label: 'Verify driver has fire-retardent clothing',
          description: '',
          value: ''
        },
        {
          type: 'checkbox',
          question_label: 'Verify driver has fire-retardent clothing',
          description: ''
        },
        {
          type: 'checkbox',
          question_label: 'Verify driver has fire-retardent clothing',
          description: ''
        }
      ]
    },
    {
      stage_number: 3,
      stage_title: 'Stage 3: Loading',
      questions: [
        {
          type: 'checkbox',
          question_label: 'Baskets',
          description: ''
        },
        {
          type: 'checkbox',
          question_label: 'Pump Skid',
          description: ''
        },
        {
          type: 'image',
          question_label: 'Bill of Lading',
          description:
            "Click the icons to use your phone's camera to capture photos of the bill of Lading"
        }
      ]
    }
  ]
};
export const bulkProcedures = {
  pre: {
    stages: [
      {
        stagenumber: 1,
        stage_title: 'Loading',
        data: [
          {
            type: 'textinput',
            label: 'Net Weight Loaded',
            description:
              'Enter the net weight loaded from the loading scale ticket',
            value: ''
          },
          {
            type: 'image',
            labe: 'Take loading ticket picture',
            description:
              'Make sure to take a clear picture of the Loading ticket for the record',
            value: ''
          }
        ]
      }
    ]
  },
  post: {
    stages: [
      {
        stagenumber: 1,
        stage_title: 'Unloading',
        data: [
          {
            type: 'textinput',
            description:
              'Enter the net weight loaded from the unloading scale ticket (Gross - Tare)',
            label: 'Net Weight Unloaded',
            value: ''
          },
          {
            type: 'image',
            label: 'Take Unloading ticket picture',
            description:
              'Make sure to take a clear picture of the Unloading ticket for the record',
            url: ''
          }
        ]
      }
    ]
  }
};

export const materialProcedures = {
  pre: {
    stages: [
      {
        stagenumber: 1,
        stage_title: 'Loading',
        data: [
          {
            type: 'checkbox',
            label: 'Manifest checklist for loading',
            description:
              'The individual line items from from shipment manifest to confirm loading',
            value: false
          },
          {
            type: 'image',
            labe: 'Take picture of BOL',
            description:
              'Make sure to take a clear picture of the BOL for the records',
            value: ''
          }
        ]
      }
    ]
  },
  post: {
    stages: [
      {
        stagenumber: 1,
        stage_title: 'Unloading',
        data: [
          {
            type: 'checkbox',
            description:
              'The individual line items from from shipment manifest to confirm unloading',
            label: 'Manifest checklist for unloading',
            value: false
          },
          {
            type: 'image',
            label: 'Take picture of POD',
            description: 'Take picture of POD',
            value: ''
          }
        ]
      }
    ]
  }
};
/**
 * 
 * 
 * 
 * Here are the default procedures per shipment type. Notice that we need to be able to say by role who will perform it.
FTL-Packaged
Stage: Loading
Manifest checklist 
Label: Manifest checklist for loading
Description: The individual line items from from shipment manifest to confirm loading
Take BOL picture
Label: Take picture of BOL
Description: Make sure to take a clear picture of the BOL for the records.
Stage: Unloading
Manifest checklist 
Label: Manifest checklist for unloading
Description: The individual line items from from shipment manifest to confirm unloading
Take POD picture
Label: Take picture of POD
Description: Make sure to take a clear picture of the proof of delivery for the records.
Bulk
Stage: Loading
Enter Net Weight loaded
Label: Net Weight Loaded
Description: Enter the net weight loaded from the loading scale ticket (Gross - Tare)
Take Loading ticket picture
Label: Take loading ticket picture
Description: Make sure to take a clear picture of the Loading ticket for the record.
Stage: Unloading
Enter Net Weight unloaded
Label: Net Weight Unloaded
Description: Enter the net weight loaded from the unloading scale ticket (Gross - Tare)
Take Unloading ticket picture
Label: Take Unloading ticket picture
Description: Make sure to take a clear picture of the Unloading ticket for the record.
 */
