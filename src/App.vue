<template lang="pug">
.section
  .section-left
    RangeInput(
      :sum="sum"
      :time="time"
      :minValue="minValue"
      :maxValue="maxValue"
      :width="width"
      @changeValue="change")
  .section-right
    Payments(
    :sum="sum"
    :time="time"
    :tooltipPayments="tooltipPayments"
    :tooltipOptions="tooltipOptions"
    @onclick-tooltip-paymets="tooltipPayments = true"
    @onclick-tooltip-opts="tooltipOptions = true"
    )
  a(v-if="width <= 959" style="width: 100%")
    button.btn.payments-block__btn(@click="orderUrl") Оформить
Loader(:loading="loading")
</template>

<script>
// import { addSpacesOnInput, removeAllSpaces } from '@/helpers/index';
import RangeInput from './components/RangeInput.vue';
import Options from './components/AdditionalOptions.vue';
import Payments from './components/UnnualPayments.vue';
import Loader from './components/LoaderBlock.vue';

export default {
  name: 'App',
  components: {
    RangeInput,
    Options,
    Payments,
    Loader,
  },
  data() {
    return {
      sum: 100000,
      time: 3,
      tooltipOptions: false,
      tooltipPayments: false,
      minValue: 100000,
      maxValue: 5000000,
      width: null,
      loading: false,
    };
  },
  created() {
    document.addEventListener('click', () => (this.tooltipOptions = false));
    document.addEventListener('click', () => (this.tooltipPayments = false));
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
  },
  mounted() {
    const queryParamsString = window.location.search;
    const searchQueryParams = new URLSearchParams(queryParamsString);
    if (searchQueryParams.has('edit')) {
      sessionStorage.setItem('edit', true);
    }
  },
  methods: {
    change(value) {
      this.loading = true;
      document.documentElement.style.transition = 'opacity 0.3s';
      document.documentElement.style.opacity = '0.3';
      this.sum = value
      if (value < 100000 || value === '') {
        this.sum = 100000;
      }
      if (value > 5000000) {
        this.sum = 5000000;
      }
      setTimeout(() => {
        document.documentElement.style.opacity = '1';
        this.loading = false;
      }, 700);
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
    orderUrl() {
      const sum = this.sum.toString().replace(/\D/gi, '');
      window.location.href = `https://order.renlife.ru/policy/?programBrief=NSZH_FINANCIAL_RENT_DSF_3YEAR&sum=${sum}${window.location.search.replace('?', '&')}`;
      return window.location.href;
    },
  },
};
</script>

<style lang="scss">
.options-block {
  margin-top: 32px;
  @media (max-width: 640px) {
    display: none;
  }
}
</style>
