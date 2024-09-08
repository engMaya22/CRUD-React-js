import * as Yup from 'yup';

export const postSchema = Yup.object().shape({//we add itoutside of add post cause no needn to revaluate
    title: Yup.string()
      .min(2, 'Too Short!')//we can change these messages
      .max(50, 'Too Long!')
      .required('Title is required'),
    description: Yup.string()
      .min(10, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Description is required'),
  });