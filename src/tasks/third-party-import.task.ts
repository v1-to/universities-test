import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { University } from '@university/university.schema';
import { UniversityService } from '@university/university.service';

@Injectable()
export class ThirdPartyImportService {
  private readonly logger = new Logger(ThirdPartyImportService.name);

  constructor(private universityService: UniversityService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async importUniversities() {
    this.logger.log('Running Import Universities Routine');
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
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            resolve(data);
          } catch (err) {
            this.logger.error(err);
            resolve([]);
          }
        });
      }),
    );

    return [].concat(...arraysOfUniversities) as University[];
  }

  private async saveUniversities(universities: University[]): Promise<void> {
    universities.forEach((university) => {
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
              `Successfully Imported ${university.name}/${university.country}`,
            );
          else
            this.logger.log(
              `Successfully Updated ${university.name}/${university.country}`,
            );
        })
        .catch((error) => {
          this.logger.error(
            `Import Failed at ${university.name}/${university.country}`,
            error,
          );
        });
    });
  }
}
