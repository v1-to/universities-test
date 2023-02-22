import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { University, UniversityDocument } from '@university/university.schema';
import { UniversityService } from '@university/university.service';

@Injectable()
export class ThirdPartyImportService {
  private readonly logger = new Logger(ThirdPartyImportService.name);

  constructor(private universityService: UniversityService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async importUniversities() {
    this.logger.log('- RUNNING IMPORT UNIVERSITIES -');
    try {
      const universities = await this.retrieveUniversities();
      await this.saveUniversities(universities);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async retrieveUniversities(): Promise<University[]> {
    const countries = [
      'argentina',
      'brazil',
      'chile',
      'colombia',
      'paraguay',
      'peru',
      'suriname',
      'uruguay',
    ];
    const arraysOfUniversities: Array<University[]> = await Promise.all(
      countries.map((country) => {
        const apiUrl = `http://universities.hipolabs.com/search?country=${country}`;
        return new Promise<University[]>(async (resolve) => {
          const response = await fetch(apiUrl);
          const data = await response.json();
          resolve(data);
        });
      }),
    );

    return [].concat(...arraysOfUniversities) as University[];
  }

  private async saveUniversities(universities: University[]): Promise<void> {
    universities.forEach((university) => {
      this.logger.log(university.name);
      this.universityService.resourceModel
        .updateOne(
          {
            name: university.name,
            'state-province': university['state-province'],
            country: university.country,
          },
          university,
          {
            upsert: true,
          },
        )
        .then(({ upsertedId }) => {
          if (upsertedId)
            this.logger.log(
              `SUCCESSFULLY UPSERTED [${upsertedId} - ${university.name}]`,
            );
        })
        .catch((error) => {
          this.logger.error(error);
        });
    });
  }
}
