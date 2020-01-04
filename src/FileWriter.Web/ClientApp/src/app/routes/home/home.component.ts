import {
  Component,
  OnInit
} from '@angular/core';

import { AppService } from '../../services';
import { WriterInput } from '../../models';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  loading = false;

  file = { } as WriterInput;

  constructor(
    public app: AppService
  ) { }

  ngOnInit() {
    this.app.getOutputFiles();
  }

  private resetFile = () => this.file = { } as WriterInput;

  writeText = async () => {
    this.loading = true;
    this.file.path = `${this.file.path}.txt`;
    const res = await this.app.writeText(this.file);
    this.loading = false;
    res && this.app.getOutputFiles() && this.resetFile();
  }

  removeOutputFile = async (file: string) => {
    const res = await this.app.removeOutputFile(file);
    res && this.app.getOutputFiles();
  }
}
