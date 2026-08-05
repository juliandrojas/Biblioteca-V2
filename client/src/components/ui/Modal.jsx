export default function Modal({
  show,
  onClose,
  title,
  children,
  footer,
  size = "",
}) {
  if (!show) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="mo  dal-backdrop fade show" onClick={onClose}></div>

      {/* Modal */}
      <div className="modal fade show d-block" tabIndex="-1">
        <div className={`modal-dialog ${size}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">{children}</div>

            {footer && <div className="modal-footer">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
