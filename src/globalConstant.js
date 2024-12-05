import Swal from "sweetalert2";
import deleteIcon from "./Assets/Icons/delete-warning-icon.png"
import success from "./Assets/Icons/success.png"

import { Modal } from "antd";
// export const IMG_URL = `https://digitalcard-bucket.s3.amazonaws.com`;

export const showSuccessMessage = (message, extraContent = "") => {
	Swal.fire({
		imageUrl: success,
		imageWidth: 100,
		imageHeight: 100,
		padding: '10px',
		html: `
			<p style='color: var(--swal-color); font-size: 24px; font-weight: 600; margin-bottom: 0; text-align: center; margin-top: -25px;'>
				${message}
			</p>
			<p style='color: var(--secondary-text-color); font-size: 14px; font-weight: 500; margin-top: 10px; text-align: center;'>
				${extraContent}
			</p>
		`,
		confirmButtonText: "Done",
		confirmButtonColor: "var(--primary-green)",
		width: '420px',
		customClass: {
			popup: 'custom-swal-popup',
			confirmButton: 'custom-swal-button',
			image: 'custom-swal-image'
		}
	});
};

export const showErrorMessage = (message) => {
	Swal.fire({
		icon: "error",
		title: "Error",
		text: message,
		confirmButtonText: "Ok",
		iconColor: "var(--danger-color)",
		confirmButtonColor: "var(--gradient-start-color)",
	});
};
export const showDeleteMessage = ({
	message,
	title = "Are you sure you want to Delete",
	content = "This action cannot be undone.",
	onDelete,
}) => {
	Modal.confirm({
		title: (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<img src={deleteIcon} alt="" style={{ width: "100px", height: "100px" }} />
				<div className="delete-message">
					{title} {message && <div>{message}?</div>}
				</div>
			</div>
		),
		content: (
			<div style={{ textAlign: "center", marginTop: "20px" }}>
				{/* {content} */}
				<div className="global-footer-div">
					<button
						className="global-cancel-button"
						onClick={() => {
							console.log("Delete action canceled");
							Modal.destroyAll();
						}}
					>
						Cancel
					</button>
					<button
						className="global-delete-button"
						onClick={() => {
							if (onDelete && typeof onDelete === "function") {
								onDelete();
							}
							showSuccessMessage("Deleted successfully","Details deleted");
							Modal.destroyAll();
						}}
					>
						Delete
					</button>
				</div>
			</div>
		),
		centered: true,
		icon: null,
		className: "custom-modal",
		okButtonProps: { style: { display: "none" } },
		cancelButtonProps: { style: { display: "none" } },
	});
};
export const showLogoutMessage = ({
	message,
	title = "Confirm Logout",
	content = '"Are you sure you want to log out?"',
	onDelete,
}) => {
	Modal.confirm({
		title: (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<img src={deleteIcon} alt="" style={{ width: "100px", height: "100px" }} />
				<div className="delete-message">
					{title} {message && <div>{message}?</div>}
				</div>
			</div>
		),
		content: (
			<div style={{ textAlign: "center" }}>
				{content}
				<div className="global-footer-div mt-3">
					<button
						className="global-cancel-button"
						onClick={() => {
							console.log("Delete action canceled");
							Modal.destroyAll();
						}}
					>
						Cancel
					</button>
					<button
						className="global-delete-button"
						onClick={() => {
							if (onDelete && typeof onDelete === "function") {
								onDelete();
							}
							showSuccessMessage("Deleted successfully","Details deleted");
							Modal.destroyAll();
						}}
					>
						Logout
					</button>
				</div>
			</div>
		),
		centered: true,
		icon: null,
		className: "custom-modal",
		okButtonProps: { style: { display: "none" } },
		cancelButtonProps: { style: { display: "none" } },
	});
};

