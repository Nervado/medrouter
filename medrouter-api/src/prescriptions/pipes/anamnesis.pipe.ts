import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AnamnesisPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      console.log(value);

      return {
        ...value,
        waist: parseInt(value.waist),
        height: parseInt(value.height),
        bpm: parseInt(value.bpm),
        weight: parseInt(value.weight),
      };
    }

    return value;
  }
}
