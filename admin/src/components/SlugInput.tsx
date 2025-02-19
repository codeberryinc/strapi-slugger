import React, { ChangeEvent, forwardRef } from 'react';
import { Field, TextInput } from '@strapi/design-system';
import { useIntl } from 'react-intl';

// ✅ Define TypeScript Props Interface
interface SlugInputProps {
  name: string;
  value?: string;
  attribute?: {
    type: string;
    customField?: string;
  };
  onChange: (event: { target: { name: string; value: string; type: string } }) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
  hint?: string;
  label?: string; // ✅ Add optional `label` prop for custom field label
  labelAction?: React.ReactNode;
}

// ✅ Use forwardRef with proper TypeScript typing
const SlugInput = forwardRef<HTMLInputElement, SlugInputProps>(
  ({ name, value, onChange, attribute, error, description, disabled, hint, labelAction }, ref) => {
    // const { formatMessage } = useIntl();

    // // ✅ Use `name` directly instead of `intlLabel`, ensuring the correct label
    // const label = name || formatMessage({ id: 'slugger.slug.label', defaultMessage: 'Slug' });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange({ target: { name, value: e.target.value, type: attribute?.type || 'string' } });
    };

    return (
      <Field.Root name={name} error={error} hint={hint}>
        <Field.Label action={labelAction}>{name}</Field.Label>
        <TextInput
          ref={ref}
          name={name}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          placeholder={'Leave empty to generate automatically'}
        />
        {description && <Field.Hint>{description}</Field.Hint>}
        {error && <Field.Error>{error}</Field.Error>}
      </Field.Root>
    );
  }
);

export default SlugInput;
