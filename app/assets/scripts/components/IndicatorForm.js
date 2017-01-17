import React from 'react';
import Form from 'react-jsonschema-form';
import Dropdown from './widgets/Dropdown';

import DataTypeWidget from './widgets/DataTypeWidget';
import { csvToJSON } from '../utils/csv';

export const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {type: 'string', title: 'Indicator Name'},
    name_ar: {type: 'string', title: 'اسم المؤشر'},
    description: {
      title: 'Description',
      type: 'string'
    },
    description_ar: {
      title: 'الوصف',
      type: 'string'
    },
    published: {
      title: 'Visibility - مدى وضوح المشروع',
      type: 'boolean',
      enumNames: ['Published - تم النشر/ الاصدار', 'Draft - مسودة (نسخة أولية)']
    },
    category: {
      title: 'Type of Data - نمط البيانات',
      type: 'string'
    },
    sds_indicator: {
      title: 'SDS Goals - أهداف استراتيجية التنمية المُستدامة',
      type: 'array',
      items: {
        title: 'SDS Goal - هدف استراتيجية التنمية المُستدامة',
        type: 'object',
        properties: {en: {type: 'string'}, ar: {type: 'string'}}
      }
    },
    sdg_indicator: {
      title: 'SDG Goals - أهداف التنمية المستدامة',
      type: 'array',
      items: {
        title: 'SDG Goal - هدف التنمية المستدامة',
        type: 'object',
        properties: {en: {type: 'string'}, ar: {type: 'string'}}
      }
    },
    themer: {
      type: 'array',
      title: 'Other Development Indicator',
      items: {
        title: 'Other Development Indicator',
        type: 'object',
        properties: {en: {type: 'string'}, ar: {type: 'string'}}
      }
    },
    sources: {
      type: 'array',
      title: 'Sources - المصادر',
      items: {
        title: 'Source',
        type: 'string'
      }
    },
    units: {
      type: 'string',
      title: 'Unit - وحدة القياس'
    },
    data_geography: {
      title: 'Data Geography',
      type: 'boolean',
      enumNames: ['Governorate - ', 'District - ']
    },
    data: {
      type: 'string',
      title: 'Data - البيانات'
    }
  }
};

const uiSchema = {
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
  sources: {
    classNames: 'multiform-group form-block'
  },
  description_ar: {
    classNames: 'ar',
    'ui:widget': 'textarea'
  },
  themer: {
    classNames: 'multiform-group',
    items: {
      classNames: 'multiform-group_item',
      'ui:field': 'select-themer'
    }
  },
  sds_indicator: {
    classNames: 'multiform-group',
    items: {
      classNames: 'multiform-group_item',
      'ui:field': 'select-sds_indicator'
    }
  },
  sdg_indicator: {
    classNames: 'multiform-group',
    items: {
      classNames: 'multiform-group_item',
      'ui:field': 'select-sdg_indicator'
    }
  },
  category: {
    'ui:field': 'datatype'
  },
  published: {
    'ui:widget': 'radio',
    classNames: 'section-half'
  },
  private: {
    classNames: 'section-half section-half-left',
    'ui:widget': 'radio'
  },
  data_geography: {
    'ui:widget': 'radio',
    classNames: 'section-half'
  },
  data: {
    'ui:widget': 'textarea',
    classNames: 'large'
  }
};

const validate = function validate (formData, errors) {
  if (formData.data) {
    try {
      csvToJSON(formData.data);
    } catch (e) {
      errors.data.addError('Is this a tab separated csv file? Contact an administrator if you\'re having problems adding data');
    }
  }
  return errors;
};

class IndicatorForm extends React.Component {
  onError (errors) {
    if (errors.length) {
      window.scroll(0, 0);
    }
  }

  render () {
    return <Form schema={schema}
      onSubmit={this.props.onSubmit}
      onChange={this.props.onChange}
      onError={this.onError.bind(this)}
      formData={this.props.formData}
      uiSchema={uiSchema}
      validate={validate}
      liveValidate
      showErrorList={false}
      fields={{
        'datatype': DataTypeWidget,
        'select-sds_indicator': Dropdown(
          'SDS Goal - هدف استراتيجية التنمية المُستدامة',
          'Select an SDS goal - يُرجى اختيار أحد أهداف استراتيجية التنمية المستدامة التى يتناولها المشروع',
          [
            'Pillar 1: Economic Development',
            'Pillar 2: Energy',
            'Pillar 3: Knowledge, Innovation and Scientific Research',
            'Pillar 4: Transparency and Efficiency of Government Institutions',
            'Pillar 5: Social Justice',
            'Pillar 6: Health',
            'Pillar 7: Education & Training',
            'Pillar 8: Culture',
            'Pillar 9: Environment',
            'Pillar 10: Urban Development',
            'Pillar 11: National Security and Foreign Policy',
            'Pillar 12: Domestic Policy'
          ],
          [
            'المحور الأول: التنمية الاقتصادية',
            'المحور الثاني: الطاقة',
            'المحور الثالث: المعرفة والابتكار والبحث العلمي',
            'المحور الرابع: شفافية وكفاءة المؤسسات الحكومية',
            'المحور الخامس: العدالة الاجتماعية',
            'المحور السادس: الصحة',
            'المحور السابع: التعليم والتدريب',
            'المحور الثامن: الثقافة',
            'المحور التاسع: البيئة',
            'المحور العاشر: التنمية العمرانية',
            '',
            ''
          ],
        ),
        'select-sdg_indicator': Dropdown(
          'SDG Goal - هدف التنمية المستدامة',
          'Select an SDG goal - يُرجى اختيار أحد أهداف التنمية المُستدامة التى يتناولها المشروع',
          [
            'Goal 1: End poverty in all its forms everywhere',
            'Goal 2: End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
            'Goal 3: Ensure healthy lies and promote well being for all at all ages',
            'Goal 4: Ensure inclusive and equitable education and promote lifelong learning opportunities for all',
            'Goal 5: Achieve gender equality and empower all women and girls',
            'Goal 6: Ensure availability and sustainable management of water and sanitation for all',
            'Goal 7: Ensure access to affordable, reliable, sustainable, and modern energy for all',
            'Goal 8: Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
            'Goal 9: Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
            'Goal 10: Reduce inequality within and among countries',
            'Goal 11: Make cities and human settlements inclusive, safe, resilient, and sustainable',
            'Goal 12: Ensure sustainable consumption and production patterns',
            'Goal 13: Take urgent action to combat climate change and its impacts',
            'Goal 14: Conserve and sustainably use the oceans and marine resources for sustainable development',
            'Goal 15: Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification and halt and reverse land degradation and halt biodiversity loss',
            'Goal 16: Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable, and inclusive institutions at all levels',
            'Goal 17: Strengthen the means of implementation and revitalize the global partnership for sustainable development'
          ],
          [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
          ],
        ),
        'select-themer': Dropdown(
          'Other Development Indicators',
          'Select Other Development Indicator',
          [
            'Education & Training',
            'Health',
            'Economy',
            'Agriculture',
            'Domestic Policy',
            'Energy',
            'Environment'
          ],
          [
            '',
            '',
            '',
            '',
            '',
            '',
            ''
          ],
        )
      }}
    >
      <button type='submit' className='btn button--primary'>Submit</button>
      {this.props.children}
    </Form>;
  }

}

export default IndicatorForm;
