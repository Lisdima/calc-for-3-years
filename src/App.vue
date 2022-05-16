<template lang="pug">
.section
  .section-left
    RangeInput(
      :sum="sum"
      :error="error"
      :time="time"
      :minValue="minValue"
      :maxValue="maxValue"
      :width="width"
      @on-focus="clearRubles"
      @on-blur="addRubles"
      @changeValue="change")
  .section-right
    Payments(
    :sum="sum"
    :time="time"
    :tooltipPayments="tooltipPayments"
    :tooltipOptions="tooltipOptions"
    :error="error"
    @onclick-tooltip-paymets="tooltipPayments = true"
    @onclick-tooltip-opts="tooltipOptions = true"
    )
  a(v-if="width <= 790" style="width: 100%")
    button.btn.payments-block__btn(:disabled="disabled" @click="orderUrl" :class="{'disabled': disabled}") Оформить
</template>

<script>
import RangeInput from './components/RangeInput.vue';
import Options from './components/AdditionalOptions.vue';
import Payments from './components/UnnualPayments.vue';

export default {
  name: 'App',
  components: {
    RangeInput,
    Options,
    Payments,
  },
  data() {
    return {
      sum: '120 000 ₽',
      error: false,
      time: 3,
      tooltipOptions: false,
      tooltipPayments: false,
      minValue: '100 000 ₽',
      maxValue: '5 000 000 ₽',
      width: null,
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
  computed: {
    disabled() {
      const sum = this.sum.replace(/\D/gi, '');
      if (sum < 100000 || sum > 5000000 || this.error) {
        return true;
      }
      return false;
    },
  },
  methods: {
    clearRubles(value) {
      this.sum = value.replace(/[^\d]/g, '');
    },
    addRubles(value) {
      const currentValue = value.replace(/[^\d]/g, '');
      if (currentValue < 100000 || currentValue > 5000000) {
        this.error = true;
        this.sum = currentValue;
      } else {
        this.error = false;
        this.sum = `${currentValue.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
      }
    },
    change(value) {
      const currentValue = value.replace(/[^\d]/g, '');
      if (value < 100000 || value > 5000000) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.sum = currentValue;
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
    orderUrl() {
      const sum = this.sum.replace(/\D/gi, '');
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
