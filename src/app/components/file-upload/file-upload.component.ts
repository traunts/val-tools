import { Component, inject } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-file-upload',
  imports: [MatCard, MatCardHeader, MatCardContent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  private fileUploadService = inject(FileUploadService);

  fileName = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFiles = input.files;
      console.log('Files selected:', selectedFiles);
      this.fileName = selectedFiles[0].name;

      this.fileUploadService.parseLogFile(selectedFiles[0]);
    }
  }
}
