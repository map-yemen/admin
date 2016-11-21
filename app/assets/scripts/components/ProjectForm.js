import React from 'react';
import Form from 'react-jsonschema-form';
import {cloneDeep} from 'lodash';
import DateFieldFactory from './widgets/DateWidget';
import LocationField from './widgets/LocationWidget';
import CurrencyField from './widgets/CurrencyWidget';
import DistrictField from './widgets/DistrictField';

export const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {type: 'string', title: 'Project Name', 'description': 'Please make sure this is a unique name'},
    name_ar: {type: 'string', title: 'اسم المشروع'},
    description: {
      title: 'Objective',
      type: 'string'
    },
    description_ar: {
      title: 'الهدف',
      type: 'string'
    },
    published: {
      title: 'Visibility',
      type: 'boolean',
      enumNames: ['Published', 'Draft']
    },
    private: {
      title: 'Privacy',
      type: 'boolean',
      enumNames: ['Private', 'Public']
    },
    components: {
      title: 'Components - مكونات',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          component: {
            title: 'Component',
            type: 'string'
          },
          component_ar: {
            title: 'مكون',
            type: 'string'
          }
        }
      }
    },
    amendments: {
      title: 'Project Amendments',
      type: 'string'
    },
    amendments_ar: {
      title: 'تعديلات',
      type: 'string'
    },
    project_delays: {
      title: 'Project Delays',
      type: 'string'
    },
    project_delays_ar: {
      title: 'تأجيلات ',
      type: 'string'
    },
    status: {type: 'string', title: 'Project Status - حالة المشروع', enum: ['Select a status', 'Planned', 'Ongoing', 'Closed']},
    planned_start_date: {type: 'string', title: 'Planned Start Date - تاريخ البدء المخطط'},
    actual_start_date: {type: 'string', title: 'Actual Start Date - تاريخ البدء الفعلي'},
    planned_end_date: {type: 'string', title: 'Planned End Date - تاريخ انتهاء المخطط'},
    actual_end_date: {type: 'string', title: 'Actual End Date - تاريخ انتهاء الفعلي'},
    local_manager: {type: 'string', title: 'Local Project Manager'},
    local_manager_ar: {type: 'string', title: 'المدير المحلي'},
    responsible_ministry: {type: 'string', title: 'Responsible Ministry - الوزارة المسؤولة', enum: ['Select a Ministry', 'Ministry 1', 'Ministry 2', 'Ministry 3']},
    project_link: {title: 'Project Link - موقع الكتروني', type: 'string', format: 'uri'},
    number_served: {
      type: 'object',
      title: 'Number of Beneficiaries - المستفيدين',
      properties: {
        number_served: {type: 'number', title: 'Amount - كمية', 'description': 'e.g. 2000'},
        number_served_unit: {type: 'string', title: 'Unit', 'description': 'e.g. Households Served'},
        number_served_unit_ar: {type: 'string', title: 'وحدة القياس'}
      }
    },
    sds_indicator: {
      title: 'SDS Goals',
      type: 'array',
      items: {
        title: 'SDS Goal',
        type: 'string',
        enum: [
          'Select an SDS goal',
          'Culture',
          'Domestic Policy',
          'Economic Development',
          'Education & Training',
          'Energy',
          'Environment',
          'Health',
          'Knowledge, Innovation and Scientific Research',
          'National Security and Foreign Policy',
          'Social Justice',
          'Transparency and Efficiency of Government Institutions',
          'Urban Development'
        ]
      }
    },
    sdg_indicator: {
      title: 'SDG Goals',
      type: 'array',
      items: {
        title: 'SDG Goal',
        type: 'string',
        enum: [
          'Select an SDG goal',
          'SDG Goal 1',
          'SDG Goal 2',
          'SDG Goal 3'
        ]
      }
    },
    category: {
      type: 'array',
      title: 'Sub-sectors - الفئات الفرعية',
      items: {
        title: 'Sub-sector',
        type: 'string',
        enum: [
          'Select a sub-sector',
          'Agriculture Extension & Research',
          'Agro-industry, Marketing & Trade',
          'Crops',
          'Fishing, Aquaculture & Forestry',
          'Livestock',
          'Rural Infrastructure & Irrigation'
        ]
      }
    },
    location: {
      title: 'Locations - مواقع',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          district: {
            type: 'object',
            required: ['governorate'],
            properties: {
              governorate: {
                title: 'Governorate',
                type: 'string'
              },
              district: {
                title: 'District',
                type: 'string'
              }
            }
          },
          marker: {
            title: 'Location Marker',
            type: 'object',
            properties: {
              lon: {type: 'number'},
              lat: {type: 'number'}
            }
          }
        }
      }

    },
    budget: {
      title: 'Budget - ميزانية',
      type: 'array',
      items: {
        type: 'object',
        required: ['fund', 'donor_name'],
        properties: {
          fund: {
            type: 'object',
            properties: {
              currency: {type: 'string'},
              rate: {type: 'number'},
              amount: {type: 'number'},
              original: {type: 'number'}
            }
          },
          donor_name: {
            type: 'string',
            title: 'Donor Name'
          },
          donor_name_ar: {
            type: 'string',
            title: 'المانح'
          }
        }
      }
    },
    disbursed: {
      title: 'Disbursed Funds',
      type: 'array',
      items: {
        type: 'object',
        required: ['fund', 'donor_name', 'type', 'date'],
        properties: {
          fund: {
            type: 'object',
            properties: {
              currenct: {type: 'string'},
              rate: {type: 'number'},
              amount: {type: 'number'},
              original: {type: 'number'}
            }
          },
          donor_name: {
            type: 'string',
            title: 'Donor Name'
          },
          donor_name_ar: {
            type: 'string',
            title: 'المانح'
          },
          type: {
            type: 'string',
            title: 'Type of Fund',
            enum: ['Select type of fund', 'Loan', 'Grant']
          },
          date: {
            type: 'string'
          }
        }
      }
    },
    kmi: {
      title: 'Key Monitoring Indicators',
      type: 'array',
      items: {
        type: 'object',
        required: ['status', 'activity', 'description', 'target', 'kpi', 'date'],
        properties: {
          component: {
            type: 'string',
            title: 'Component',
            enum: []
          },
          status: {
            type: 'string',
            title: 'Status',
            enum: ['Select a status', 'Not Implemented', 'Partially Implemented', 'Implemented']
          },
          description: {
            type: 'string',
            title: 'Implementation Description'
          },
          baseline: {
            type: 'string',
            title: 'Baseline'
          },
          current: {
            type: 'string',
            title: 'Current'
          },
          target: {
            type: 'string',
            title: 'Target'
          },
          kpi: {
            type: 'string',
            title: 'KPI'
          },
          date: {
            type: 'string',
            title: 'Monitoring Date'
          },
          reportLink: {
            type: 'string',
            title: 'Report Link',
            format: 'uri'
          }
        }
      }
    }
  }
};

class ProjectForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {};
    this.state.schema = schema;
    this.state.formData = this.props.formData;
    this.state.uiSchema = {
      components: {
        classNames: 'multiform-group form-block',
        items: {
          classNames: 'multiform-group_item',
          component: {
            classNames: 'with-ar'
          },
          component_ar: {
            classNames: 'ar'
          }
        }
      },
      category: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      name: {
        classNames: 'section-half'
      },
      name_ar: {
        classNames: 'ar section-half section-half-left'
      },
      description: {
        classNames: 'with-ar',
        'ui:widget': 'textarea'
      },
      description_ar: {
        classNames: 'ar',
        'ui:widget': 'textarea'
      },
      published: {
        classNames: 'section-half',
        'ui:widget': 'radio'
      },
      private: {
        classNames: 'section-half section-half-left',
        'ui:widget': 'radio'
      },
      amendments: {
        classNames: 'with-ar',
        'ui:widget': 'textarea'
      },
      amendments_ar: {
        classNames: 'ar',
        'ui:widget': 'textarea'
      },
      project_delays: {
        classNames: 'with-ar',
        'ui:widget': 'textarea'
      },
      project_delays_ar: {
        classNames: 'ar',
        'ui:widget': 'textarea'
      },
      local_manager: {
        classNames: 'section-half'
      },
      local_manager_ar: {
        classNames: 'ar section-half section-half-left'
      },
      number_served: {
        classNames: 'field-half form-less-spacing',
        number_served: {
        },
        number_served_unit: {
          classNames: 'padding-right'
        },
        number_served_unit_ar: {
          classNames: 'ar form-float-right'
        }
      },
      percent_complete: {
        'ui:widget': 'range'
      },
      planned_start_date: {
        classNames: 'form-extra-spacing',
        'ui:field': 'short-date'
      },
      actual_start_date: {
        classNames: 'form-extra-spacing',
        'ui:field': 'short-date'
      },
      planned_end_date: {
        classNames: 'form-extra-spacing',
        'ui:field': 'short-date'
      },
      actual_end_date: {
        classNames: 'form-extra-spacing',
        'ui:field': 'short-date'
      },
      project_link: {
        'ui:placeholder': 'http://'
      },
      location: {
        classNames: 'form-block multiform-group',
        items: {
          district: {'ui:field': 'district'},
          marker: {'ui:field': 'marker'}
        }
      },
      sds_indicator: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      sdg_indicator: {
        classNames: 'multiform-group',
        items: {
          classNames: 'multiform-group_item'
        }
      },
      budget: {
        classNames: 'form-block columns-small multiform-group',
        items: {
          fund: {'ui:field': 'currency'},
          donor_name_ar: {
            classNames: 'ar'
          }
        }
      },
      disbursed: {
        classNames: 'form-block columns-small multiform-group',
        items: {
          fund: {'ui:field': 'currency'},
          date: {'ui:field': 'fund-date'},
          donor_name_ar: {
            classNames: 'ar'
          }
        }
      },
      kmi: {
        classNames: 'form-block multiform-group',
        items: {
          date: {
            'ui:field': 'monitoring-date'
          },
          description: {
            'ui:widget': 'textarea'
          },
          reportLink: {
            'ui:placeholder': 'http://'
          }
        }
      }
    };
  }

  onChange ({formData}) {
    if (formData.components) {
      const componentEnums = formData.components.filter((component) => {
        return component && component.component && component.component.length > 0;
      }).map((component) => `${component.component} - ${component.component_ar}`);
      if (componentEnums.length > 0) {
        let schema = cloneDeep(this.state.schema);
        schema.properties.kmi.items.properties.component.enum = componentEnums;
        this.setState({schema: schema, formData: formData});
      }
    }
  }

  render () {
    return <Form schema={this.state.schema}
      onSubmit={this.props.onSubmit}
      formData={this.state.formData}
      onChange = {this.onChange.bind(this)}
      fields={{
        'short-date': DateFieldFactory('Year', 'Month'),
        'fund-date': DateFieldFactory('Year Disbursed', 'Month Disbursed'),
        'monitoring-date': DateFieldFactory('Monitoring Date - Year', 'Monitoring Date - Month'),
        'district': DistrictField,
        'marker': LocationField,
        'currency': CurrencyField
      }}
      uiSchema = {this.state.uiSchema}
    >
      <button type='submit' className='btn button--primary'>Submit</button>
      {this.props.children}
      </Form>;
  }
}

export default ProjectForm;
