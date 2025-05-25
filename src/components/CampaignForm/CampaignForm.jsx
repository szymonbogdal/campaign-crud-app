import { useState } from "react";
import KeywordInput from "./KeywordInput";
import TextInput from "./FormFields/TextInput";
import NumberInput from "./FormFields/NumberInput";
import SelectInput from "./FormFields/SelectInput";
import "./CampaignForm.css";
import useFormValidation from "../../hooks/useFormValidation";

import { MOCK_KEYWORDS, MOCK_TOWNS } from "../../data/mockData";

const CampaignForm = ({
    campaign,
    onSubmit,
    onCancel,
    isEdit = false,
    accountBalance,
}) => {
    const [formData, setFormData] = useState({
        name: campaign?.name || "",
        keywords: campaign?.keywords || [],
        bidAmount: campaign?.bidAmount || "",
        campaignFund: campaign?.campaignFund || "",
        status: campaign?.status ?? true,
        town: campaign?.town || "",
        radius: campaign?.radius || "",
    });

    const { errors, validateForm } = useFormValidation(
        formData,
        isEdit,
        accountBalance,
        isEdit ? campaign.campaignFund : 0
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                bidAmount: parseFloat(formData.bidAmount),
                campaignFund: parseFloat(formData.campaignFund),
                radius: parseInt(formData.radius),
            });
        }
    };

    const handleInputChange = (field) => (e) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{isEdit ? "Edit campaign" : "Add new campaign"}</h2>
                <div className="campaign-form">
                    <TextInput
                        label="Campaign name *"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        error={errors.name}
                    />
                    <div className="form-group">
                        <label>Key words *</label>
                        <KeywordInput
                            keywords={formData.keywords}
                            onChange={(keywords) =>
                                setFormData({ ...formData, keywords })
                            }
                            suggestions={MOCK_KEYWORDS}
                        />
                        {errors.keywords && (
                            <span className="error-message">
                                {errors.keywords}
                            </span>
                        )}
                    </div>
                    <div className="form-row">
                        <NumberInput
                            label="Bid amount (zł) *"
                            value={formData.bidAmount}
                            onChange={handleInputChange("bidAmount")}
                            error={errors.bidAmount}
                            step="0.01"
                            min="0.01"
                        />
                        <NumberInput
                            label="Campaign fund (zł) *"
                            value={formData.campaignFund}
                            onChange={handleInputChange("campaignFund")}
                            error={errors.campaignFund}
                            step="0.01"
                            min="1"
                        />
                    </div>
                    <div className="form-row">
                        <SelectInput
                            label="Town *"
                            value={formData.town}
                            onChange={handleInputChange("town")}
                            error={errors.town}
                            options={MOCK_TOWNS}
                        />
                        <NumberInput
                            label="Radius (km) *"
                            value={formData.radius}
                            onChange={handleInputChange("radius")}
                            error={errors.radius}
                            min="1"
                            max="100"
                        />
                    </div>
                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.status}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        status: e.target.checked,
                                    })
                                }
                            />
                            Is active
                        </label>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                        >
                            {isEdit ? "Save changes" : "Add campaign"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignForm;
