import * as Yup from 'yup';

function validationOver18YearsOld() {
    return Yup.date()
        .typeError('Please enter a valid date')
        .required('Date of Birth is required')
        .test('validate-over-18', 'You must be over 18 years of age.', (value) => {
            if (!value) return false;
            const today = new Date(Date.now());
            let age = today.getFullYear() - value.getFullYear();
            if (
                today.getMonth() < value.getMonth() ||
                (today.getMonth() == value.getMonth() && today.getDate() < value.getDay())
            ) {
                age--;
            }

            return age >= 18;
        });
}

export default validationOver18YearsOld;