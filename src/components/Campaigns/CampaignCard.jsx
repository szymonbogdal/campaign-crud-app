import { Edit2, Trash2, MapPin, Tag } from "lucide-react";
import { useState } from "react";

const CampaignCard = ({ campaign, onEdit, onDelete }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>
            <div className="campaign-card">
                <div className="campaign-header">
                    <h3 className="campaign-name">{campaign.name}</h3>
                    <div className="campaign-actions">
                        <button
                            onClick={() => onEdit(campaign)}
                            className="btn-icon"
                            title="Edit"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn-icon btn-danger"
                            title="Delete"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="campaign-details">
                    <div className="campaign-keywords">
                        <Tag size={14} />
                        <span>{campaign.keywords.join(", ")}</span>
                    </div>

                    <div className="campaign-location">
                        <MapPin size={14} />
                        <span>
                            {campaign.town} ({campaign.radius}km)
                        </span>
                    </div>

                    <div className="campaign-financials">
                        <div className="financial-item">
                            <span className="label">Bid amount:</span>
                            <span className="value">
                                {campaign.bidAmount.toFixed(2)} zł
                            </span>
                        </div>
                        <div className="financial-item">
                            <span className="label">Campain Fund:</span>
                            <span className="value">
                                {campaign.campaignFund.toFixed(2)} zł
                            </span>
                        </div>
                    </div>

                    <div className="campaign-status">
                        <span
                            className={`status-badge ${
                                campaign.status ? "active" : "inactive"
                            }`}
                        >
                            {campaign.status ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <div className="modal-overlay delete-modal">
                    <div className="modal delete-modal">
                        <h2>Delete Campaign</h2>
                        <p>
                            Are you sure you want to delete{" "}
                            <strong>"{campaign.name}"</strong>? This action
                            cannot be undone.
                        </p>
                        <div className="delete-modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    onDelete(campaign.id);
                                    setShowDeleteModal(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CampaignCard;
