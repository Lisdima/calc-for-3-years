<template lang="pug">
.calculator
  .calculator--form
      h4.calculator--form__title.title Ежегодный взнос
      .forms
        .forms__inputs
          input#range-input(
            v-model="value"
            maxLength="8"
            @focus="onFocus($event.target.value)"
            @blur="onBlur($event.target.value)"
            @keyup.enter="onBlur($event.target.value); $event.target.blur()"
          )
          input#range-input-slider(
            class="styled-slider slider-progress"
            type="range"
            step="1000"
            v-model="sliderSumComp"
            :min="minValue"
            :max="maxValue"
            @change="changeSlider($event.target.value)"
            @input="inputSlider($event.target.value)"
          )
        .slider-input__terms
          .slider-input__terms-text-l {{ minValueSlider }} ₽

          .slider-input__terms-text-r {{ maxValueSlider }} ₽
  a
    button.btn.payments-block__btn(v-if="width > 959" @click="orderUrl") Оформить


</template>

<script>
import { addSpacesOnInput, removeAllSpaces } from '@/helpers/index';
export default {
  props: {
    sum: {
      type: Number,
    },
    time: {
      type: Number,
    },
    minValue: {
      type: Number,
    },
    maxValue: {
      type: Number,
    },
    width: {
      type: Number,
    },
  },
  data() {
    return {
      minValueSlider: addSpacesOnInput(this.minValue.toString()),
      maxValueSlider: addSpacesOnInput(this.maxValue.toString()),
      value: '0',
      sliderSum: 0,
    };
  },
  mounted() {
    this.value = `${addSpacesOnInput(this.sum.toString())} ₽`;
    this.progressSlider(true, sessionStorage.getItem('sum') !== null ? sessionStorage.getItem('sum') : this.sliderSum);
    if (sessionStorage.getItem('sum') !== null) {
      this.sliderSumComp = sessionStorage.getItem('sum');
      this.value = `${addSpacesOnInput(sessionStorage.getItem('sum').toString())} ₽`;
    }
  },
  computed: {
    sliderSumComp: {
      get: function () {
        return this.sliderSum;
      },
      set: function (newValue) {
        this.sliderSum = newValue;
      },
    },
  },
  methods: {
    progressSlider(getStorage, valueStorage) {
      for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        !getStorage ? e.style.setProperty('--value', this.sliderSumComp) : e.style.setProperty('--value', valueStorage);
        e.style.setProperty('--min', e.min == '' ? '100000' : e.min);
        e.style.setProperty('--max', e.max == '' ? '5000000' : e.max);
        e.addEventListener('input', () => {
          e.style.setProperty('--value', this.sliderSumComp);
        });
      }
    },
    progressSliserOnInput() {
      const input = document.querySelector('input#range-input');
      for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        const currentSum = input.value.toString().replace(/[^\d]/g, '').length === 0 ? 0 : input.value.toString().replace(/[^\d]/g, '');
        e.style.setProperty('--value', currentSum);
        e.style.setProperty('--min', e.min == '' ? '100000' : e.min);
        e.style.setProperty('--max', e.max == '' ? '5000000' : e.max);
        input.addEventListener('change', () => {
          e.style.setProperty('--value', currentSum);
        });
      }
    },
    inputSlider(e) {
      this.value = `${removeAllSpaces(e.toString())}`;
      this.sliderSumComp = e;
      this.$emit('inputValue', e);
    },
    changeSlider(e) {
      this.value = `${addSpacesOnInput(this.sliderSumComp.toString())} ₽`;
      this.$emit('changeValue', e);
    },
    onFocus(e) {
      this.value = `${removeAllSpaces(e.toString())}`;
    },
    onBlur(e) {
      let currentSum = e.toString().replace(/[^\d]/g, '').length === 0 ? 0 : e.toString().replace(/[^\d]/g, '');
      if (currentSum < 100000 || currentSum === '') {
        currentSum = 100000;
      }
      if (currentSum > 5000000) {
        currentSum = 5000000;
      }
      this.value = `${addSpacesOnInput(currentSum.toString())} ₽`;
      this.sliderSumComp = currentSum;
      this.progressSliserOnInput();
      this.$emit('changeValue', currentSum);
    },
    orderUrl() {
      const sum = sessionStorage.getItem('sum') === null ? this.sum.toString().replace(/\D/gi, '') : sessionStorage.getItem('sum');
      sessionStorage.setItem('sum', sum);
      window.location.href = `https://order.renlife.ru/policy/?programBrief=NSZH_FINANCIAL_RENT_DSF_3YEAR_BANK&sum=${sum}${window.location.search.replace('?', '&')}`;
      return window.location.href;
    },
  },
};
</script>

<style lang="scss">
.calculator {
  width: 100%;
  @media (max-width: 640px) {
    display: flex;
    max-width: none;
  }
  &--form {
    width: 100%;
    p {
      margin-top: 4px;
    }
  }
  &--form__title {
    margin-bottom: 20px;
  }
  &__subtitle {
    margin-top: 4px;
  }
  &--info {
    @media (max-width: 640px) {
      margin-left: 32px;
    }
    .info-time {
      margin-top: 6px;
    }
    p {
      font-size: 16px;
      line-height: 24px;
      max-width: 71px;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 5px 6px 6px 15px;
      background: #28323c;
      color: #ffffff;
    }
  }
  .slider-input {
    &__label,
    &__terms {
      color: #8c959e;
      font-size: 14px;
      font-weight: 300;
      line-height: 18px;
      letter-spacing: -0.01em;
    }
    &__terms {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
  }
  .forms {
    position: relative;
    width: 100%;
    &__inputs {
      width: 100%;
      position: relative;
    }
  }
}
.circle {
  position: absolute;
  top: 68%;
  width: 20px;
  height: 20px;
  left: 100%;
  border-radius: 50%;
  border: 1px solid #dbdfe4;
  background: #ffffff;
  vertical-align: middle;
  display: inline-block;
  &:after {
    content: '';
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #50287d;
  }
}
</style>
