import { useState } from "react";

const useFormValidation = (formData, isEdit, accountBalance, originalFund) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Campaign name is required";
        }

        if (formData.keywords.length === 0) {
            newErrors.keywords = "At least one keyword is required";
        }

        if (!formData.bidAmount || formData.bidAmount < 0.01) {
            newErrors.bidAmount = "Minimum bid amount is 0.01 PLN";
        }

        if (!formData.campaignFund || formData.campaignFund < 1) {
            newErrors.campaignFund = "Minimum campaign budget is 1 PLN";
        }

        if (isEdit) {
            const fundDifference = formData.campaignFund - originalFund;
            if (fundDifference > 0 && fundDifference > accountBalance) {
                newErrors.campaignFund =
                    "Insufficient account balance for budget increase";
            }
        } else if (formData.campaignFund > accountBalance) {
            newErrors.campaignFund = "Insufficient account balance";
        }

        if (!formData.town) {
            newErrors.town = "City selection is required";
        }

        if (!formData.radius || formData.radius < 1 || formData.radius > 100) {
            newErrors.radius = "Radius must be between 1 and 100 km";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { errors, validateForm };
};

export default useFormValidation;
