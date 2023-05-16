import docIcon from '@/assets/images/file_icons/file_doc.png'
import docxIcon from '@/assets/images/file_icons/file_docx.png'
import pdfIcon from '@/assets/images/file_icons/file_pdf.png'
import pptIcon from '@/assets/images/file_icons/file_ppt.png'
import pptxIcon from '@/assets/images/file_icons/file_pptx.png'
import txtIcon from '@/assets/images/file_icons/file_txt.png'
import xlsIcon from '@/assets/images/file_icons/file_xls.png'
import xlsxIcon from '@/assets/images/file_icons/file_xlsx.png'
import unknownFileIcon from '@/assets/images/file_icons/file_unknown.png'

export const handleFileExtensionIcon = (filename: string) => {
  const fileExtension = filename.split('.')[1]

  switch (fileExtension) {
    case 'pdf': {
      return pdfIcon
    }
    case 'doc': {
      return docIcon
    }
    case 'docx': {
      return docxIcon
    }
    case 'ppt': {
      return pptIcon
    }
    case 'pptx': {
      return pptxIcon
    }
    case 'txt': {
      return txtIcon
    }
    case 'xls': {
      return xlsIcon
    }
    case 'xlsx': {
      return xlsxIcon
    }
    default: {
      return unknownFileIcon
    }
  }
}
