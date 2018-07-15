$(() => {
    const $buttonNewFile = $('#p3x-gitlist-tree-new-file')

    if ($buttonNewFile.length === 0) {
        return
    }

    const path = window.gitlist.getPath()

    // <editor-fold desc="file">

   const $buttonNewFileModal = $('#p3x-gitlist-modal-new')
    const $formNewfile = $('#p3x-gitlist-modal-new-form')
    const $buttonSubmitNewfile = $('#p3x-gitlist-modal-new-filename-confirm')
    const $inputNewfile = $('#p3x-gitlist-modal-new-filename')
    $inputNewfile.val(path)

    $buttonNewFile.click(() => {
        if (!window.gitlist.changeableCommit()) {
            return
        }
        $buttonNewFileModal.modal('show')
    })

    $buttonSubmitNewfile.click(async() => {

        if($formNewfile[0].checkValidity() === false) {
            window.gitlist.invalidSnackbarCommit()
            return;
        }

        try {
            const url = `${window.gitlist.basepath}/${window.gitlist.repo}/git-helper/${window.gitlist.branch}/new-file-or-directory`
            const response = await $.ajax({
                url: url,
                type: 'POST',
                data: {
                    value: value,
                    email: inputs.email.val(),
                    name: inputs.name.val(),
                    comment: inputs.comment.val(),
                    filename: filename
                }
            })
        } catch(e) {
            window.gitlist.ajaxErrorHandler(e)
        }

        $.snackbar({
            htmlAllowed: true,
            content: 'New file in progress',
            timeout: window.gitlist.snapckbarLongTimeout,
        })
       // $buttonNewFileModal.modal('hide')
    })

    // </editor-fold>

    // <editor-fold desc="upload">

    const $buttonNewBinary = $('#p3x-gitlist-tree-new-binary')
    const $buttonNewBinaryModal = $('#p3x-gitlist-modal-new-binary')
    const $formNewfileBinary = $('#p3x-gitlist-modal-new-binary-form')
    const $buttonSubmitNewfileBinary = $('#p3x-gitlist-modal-new-filename-binary-confirm')
    const $inputNewfileBinaryFile = $('#p3x-gitlist-modal-new-binary-filename-binary')
    const $inputNewfileBinaryUpload = $('#p3x-gitlist-modal-new-binary-filename-binary-upload')
    $inputNewfileBinaryFile.val(path)

    let uploadBinaryFilename = ''

    $buttonNewBinary.click(() => {
        if (!window.gitlist.changeableCommit()) {
            return
        }
        $buttonNewBinaryModal.modal('show')
    })

    $inputNewfileBinaryUpload.change(() => {
        if ($inputNewfileBinaryUpload[0].files.length === 0) {
            console.log('1')
            $inputNewfileBinaryFile.val(`${path}`)
        } else {
            console.log('2')
            uploadBinaryFilename = $inputNewfileBinaryUpload[0].files[0].name
            $inputNewfileBinaryFile.val(`${path}${uploadBinaryFilename}`)
        }
    })

    $buttonSubmitNewfileBinary.click(() => {
        if($formNewfileBinary[0].checkValidity() === false) {
            window.gitlist.invalidSnackbarCommit()
            return;
        }

        $.snackbar({
            htmlAllowed: true,
            content: 'New file binary in progress',
            timeout: window.gitlist.snapckbarLongTimeout,
        })

        $buttonNewBinaryModal.modal('hide')
    })

    // </editor-fold>


})

