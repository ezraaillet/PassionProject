import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import UserService from "../services/user-service";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function DisableAccount({
  open,
  setOpen,
  email,
  deleteAccount,
}: any) {
  const { deleteUserByEmail } = UserService();

  function confirmDeleteUser() {
    deleteAccount();
  }

  return (
    <div className="DisableAccountModalContainer">
      <div className="DisableAccountModalContent">
        <p className="DisableAccountModalTitle">Delete Account</p>
        <p>
          Are you sure you want to delete <strong>your account</strong>?
        </p>
        <div className="DisableAccountWarning">
          <div className="DisableAccountIcon">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ color: "#d4513d" }}
            />{" "}
            <strong>Warning</strong>
          </div>
          <div className="DisableAccountUnderIconText">
            By deleting this account, you won't be able to access the system.
          </div>
        </div>
        <div className="DisableAccountButtonContainer">
          <button
            className="DisableAccountButtonCancel"
            type="button"
            onClick={() => setOpen(false)}
          >
            No, Cancel
          </button>
          <button
            className="DisableAccountButtonConfirm"
            type="button"
            onClick={() => confirmDeleteUser()}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
