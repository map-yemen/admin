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
      title: 'Visibility - مدى وضوح المشروع',
      type: 'boolean',
      default: false,
      enumNames: ['Published - تم النشر/ الاصدار', 'Draft - مسودة (نسخة أولية)']
    },
    private: {
      title: 'Privacy',
      type: 'boolean',
      enumNames: ['Private', 'Public']
    },
    components: {
      title: 'Project Components - مكونات المشروع (الأهداف المحددة وأنشطة المشروع)',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          component: {
            title: 'Component',
            type: 'string'
          },
          component_ar: {
            title: 'المكون',
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
      title: 'تعديلات المشروع',
      type: 'string'
    },
    project_delays: {
      title: 'Project Delays',
      type: 'string'
    },
    project_delays_ar: {
      title: 'حالات التأخير في المشروع',
      type: 'string'
    },
    status: {type: 'string', title: 'Project Status - وضع/ حالة المشروع', enum: ['Select a status - يُرجى اختيار وضع محدد (حالة محددة)', 'Planned - مُخطط', 'Ongoing - جاري/ مستمر', 'Closed - مُغلق']},
    planned_start_date: {type: 'string', title: 'Planned Start Date - تاريخ البدء (الانطلاق) المُخطط'},
    actual_start_date: {type: 'string', title: 'Actual Start Date - تاريخ البدء (الانطلاق) الفعلي'},
    planned_end_date: {type: 'string', title: 'Planned End Date - تاريخ الانتهاء المُخطط'},
    actual_end_date: {type: 'string', title: 'Actual End Date - تاريخ الانتهاء الفعلي'},
    local_manager: {type: 'string', title: 'Local Project Manager'},
    local_manager_ar: {type: 'string', title: 'المدير المحلي للمشروع'},
    responsible_ministry: {type: 'string', title: 'Responsible Ministry - الوزارة المسؤولة', enum: ['Select a Ministry', 'Ministry 1', 'Ministry 2', 'Ministry 3']},
    project_link: {title: 'Project Link - الرابط الالكتروني للمشروع', type: 'string', format: 'uri'},
    number_served: {
      type: 'object',
      title: 'Number of Beneficiaries - عدد المستفيدين/ المستفيدات (عدد الأطراف المستفيدة)',
      properties: {
        number_served: {type: 'number', title: 'Amount - الكمية (المقدار)', 'description': 'e.g. 2000'},
        number_served_unit: {type: 'string', title: 'Unit', 'description': 'e.g. Households Served'},
        number_served_unit_ar: {type: 'string', title: 'الفئة (الوحدة)'}
      }
    },
    sds_indicator: {
      title: 'SDS Goals',
      type: 'array',
      items: {
        title: 'SDS Goal - أهداف استراتيجية التنمية المُستدامة',
        type: 'string',
        enum: [
          'Select an SDS goal - يُرجى اختيار أحد أهداف استراتيجية التنمية المستدامة التى يتناولها المشروع',
          'Culture - الثقافة',
          'Domestic Policy - ',
          'Economic Development',
          'Education & Training',
          'Energy - الطاقة',
          'Environment',
          'Health -  الصحة',
          'Knowledge, Innovation and Scientific Research - المعرفة والابتكار والبحث العلمي',
          'National Security and Foreign Policy',
          'Social Justice',
          'Transparency and Efficiency of Government Institutions - شفافية وكفاءة المؤسسات الحكومية',
          'Urban Development'
        ]
      }
    },
    sdg_indicator: {
      title: 'SDG Goals',
      type: 'array',
      items: {
        title: 'SDG Goal - أهداف التنمية المستدامة',
        type: 'string',
        enum: [
          'Select an SDG goal - يُرجى اختيار أحد أهداف التنمية المُستدامة التى يتناولها المشروع',
          'End poverty in all its forms everywhere',
          'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
          'Ensure healthy lies and promote well being for all at all ages',
          'Ensure inclusive and equitable education and promote lifelong learning opportunities for all',
          'Achieve gender equality and empower all women and girls',
          'Ensure availability and sustainable management of water and sanitation for all',
          'Ensure access to affordable, reliable, sustainable, and modern energy for all',
          'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
          'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
          'Reduce inequality within and among countries',
          'Make cities and human settlements inclusive, safe, resilient, and sustainable',
          'Ensure sustainable consumption and production patterns',
          'Take urgent action to combat climate change and its impacts',
          'Conserve and sustainably use the oceans and marine resources for sustainable development',
          'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification and halt and reverse land degradation and halt biodiversity loss',
          'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable, and inclusive institutions at all levels',
          'Strengthen the means of implementation and revitalize the global partnership for sustainable development'
        ]
      }
    },
    category: {
      type: 'array',
      title: 'Sub-sectors - القطاعات الفرعية',
      items: {
        title: 'Sub-sector - القطاع الفرعي',
        type: 'string',
        enum: [
          'Select a sub-sector - يُرحى اختيار قطاع فرعي',
          'Agriculture Extension & Research - الارشاد الزراعي والبحث',
          'Agro-industry, Marketing & Trade - الصناعات الزراعية والتسويق والتجارة',
          'Crops - المحاصيل',
          'Fishing, Aquaculture & Forestry - صيد الأسماك وتربية الأحياء المائية وعلم التحريج',
          'Livestock - الثروة الحيوانية (الماشية)',
          'Rural Infrastructure & Irrigation - البنية التحتية بالمناطق الريفية والري'
        ]
      }
    },
    location: {
      title: 'Locations - النطاق الجغرافي',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          district: {
            type: 'object',
            required: ['governorate'],
            properties: {
              governorate: {
                title: 'Governorate - المحافظة',
                type: 'string'
              },
              district: {
                title: 'District - المركز',
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
      title: 'Budget - يُرجى اختيار عملة التداول',
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
            title: 'الجهة المانحة'
          }
        }
      }
    },
    disbursed: {
      title: 'Disbursed Funds - التمويل الصادر (التمويل المدفوع)',
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
      title: 'Key Monitoring Indicators - مؤشرات الرصد الرئيسية',
      type: 'array',
      items: {
        type: 'object',
        required: ['status', 'target', 'kpi', 'date'],
        properties: {
          kpi: {
            type: 'string',
            title: 'KPI'
          },
          component: {
            type: 'string',
            title: 'Component',
            enum: []
          },
          status: {
            type: 'string',
            title: 'Status',
            enum: ['Select a status - يُرجى اختيار الوضع/ الحالة', 'Not Implemented - لم يتحقق', 'Partially Implemented - تحقق جزئياً', 'Implemented - تحقق بالكامل']
          },
          description: {
            type: 'string',
            title: 'Implementation Description'
          },
          baseline: {
            type: 'string',
            title: 'Baseline - تقييم خط الأساس (التقييم الأولي/المبدئي)'
          },
          current: {
            type: 'string',
            title: 'Current - الحالي'
          },
          target: {
            type: 'string',
            title: 'Target - المُستهدف'
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
    let schema = cloneDeep(this.state.schema);
    if (formData.components) {
      const componentEnums = formData.components.filter((component) => {
        return component && component.component && component.component.length > 0;
      }).map((component) => `${component.component} - ${component.component_ar}`);
      if (componentEnums.length > 0) {
        schema.properties.kmi.items.properties.component.enum = componentEnums;
      }
    }
    this.setState({schema: schema, formData: formData});
  }

  onError (errors) {
    if (errors.length) {
      window.scroll(0, 0);
    }
  }

  render () {
    let isDraft = true;
    if (this.state.formData && this.state.formData.published) {
      isDraft = !this.state.formData.published;
    }
    return <Form schema={this.state.schema}
      onSubmit={this.props.onSubmit}
      formData={this.state.formData}
      onChange = {this.onChange.bind(this)}
      onError= {this.onError.bind(this)}
      noValidate={isDraft}
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
